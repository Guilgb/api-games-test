export class ListGamesDto {
  /**
   * Represents the title of the game.
   *
   * @remarks
   * This property is optional and can be used to filter games by their title.
   * @example
   * 'The Legend of Zelda'
   */
  /**
   * @ApiProperty
   * Indicates that this property is optional.
   * Description: The title of the game.
   * Example: 'The Legend of Zelda'
   */
  title?: string;

  /**
   * Represents the platform of the game.
   *
   * @remarks
   * This property is optional and can be used to filter games by their platform.
   * @example
   * 'Nintendo Switch'
   */
  platform?: string;

  /**
   * Represents the page number for pagination.
   *
   * @remarks
   * This property is optional and can be used to specify the current page.
   * @example
   * 1
   */
  page?: number;

  /**
   * Represents the number of items per page for pagination.
   *
   * @remarks
   * This property is optional and can be used to specify the page size.
   * @example
   * 10
   */
  limit?: number;
}
