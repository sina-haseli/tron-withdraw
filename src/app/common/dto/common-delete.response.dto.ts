export default class CommonDeleteResponseDto {
  constructor(data: CommonDeleteResponseDto) {
    this.isDeleted = data.isDeleted;
  }
  isDeleted: boolean;
}
