import { ApiProperty } from '@nestjs/swagger';

export class DtoGetLinksResponse {
  @ApiProperty({ example: 1 })
  id_links: number;

  @ApiProperty({ example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
  url: string;

  @ApiProperty({ example: 'ddfbsd' })
  short_code: string;

  @ApiProperty({ example: 'http://localhost:4000/ddfbsd' })
  short_url: string;

  @ApiProperty({ example: 42 })
  click_count: number;

  @ApiProperty({ example: '2025-11-01T10:00:00Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-11-12T09:00:00Z', required: false })
  updated_at?: Date;

  @ApiProperty({ example: '2025-11-10T15:00:00Z', required: false })
  inactivated_at?: Date;

  constructor(partial: Partial<DtoGetLinksResponse>) {
    Object.assign(this, partial);
  }
}