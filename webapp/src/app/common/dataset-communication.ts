export class DatasetCom {
  public name = '';
  constructor(
    public path = '',
    public label = '',
    public removePath = '',
    public parent = '',
    public files = new Array<string>(),
    public children = new Array<string>(),
    public siblings = new Array<string>(),
  ) {
  }
}
