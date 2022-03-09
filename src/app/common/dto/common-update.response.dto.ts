export default class CommonUpdateResponseDto {
  constructor(data: CommonUpdateResponseDto) {
    this.isUpdated = data.isUpdated;
  }
  isUpdated: boolean;
}
