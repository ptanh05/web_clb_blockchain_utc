import { NextRequest, NextResponse } from 'next/server';
import { EventService } from '../events.service';
import type { EventResponse } from '../types';
import type { ErrorResponse } from '../types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<EventResponse>> {
  const { id } = params;
  try {
    const event = await EventService.getEventById(Number(id));
    if (!event) {
      return NextResponse.json(
        { data: null, error: 'Event not found', details: `No event with id ${id}` },
        { status: 404 }
      );
    }

    let notionContent: string | null = null;
    if (event.notion_page_id) {
      const notionResp = await fetch(
        `https://api.notion.com/v1/blocks/${event.notion_page_id}/children`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
          },
        }
      );

      if (notionResp.ok) {
        const data = await notionResp.json();

        const parseBlock = (block: any): string => {
          switch (block.type) {
            case "heading_1":
              return `# ${block.heading_1.rich_text.map((t: any) => t.plain_text).join("")}`;

            case "heading_2":
              return `## ${block.heading_2.rich_text.map((t: any) => t.plain_text).join("")}`;

            case "heading_3":
              return `### ${block.heading_3.rich_text.map((t: any) => t.plain_text).join("")}`;

            case "paragraph":
              return block.paragraph.rich_text
                .map((t: any) => {
                  if (t.annotations.bold) return `**${t.plain_text}**`;
                  if (t.annotations.italic) return `*${t.plain_text}*`;
                  if (t.annotations.underline) return `<u>${t.plain_text}</u>`;
                  return t.plain_text;
                })
                .join("");

            case "image":
              const url =
                block.image.type === "external"
                  ? block.image.external.url
                  : block.image.file.url;
              return `![Image](${url})`;

            case "quote":
              return `> ${block.quote.rich_text.map((t: any) => t.plain_text).join("")}`;

            case "divider":
              return `---`;

            default:
              return "";
          }
        };

        notionContent = data.results
          .map((block: any) => parseBlock(block))
          .filter((line: string) => line.trim().length > 0)
          .join("\n\n");
      }

    }
    return NextResponse.json({ data: {
      ...event,
      notionContent
    }});
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to fetch event',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ views: number } | ErrorResponse>> {
  const { id } = params;
  try {
    const newViews = await EventService.incrementViews(Number(id));
    return NextResponse.json({ views: newViews });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to increment views', details: message }, { status: 500 });
  }
}