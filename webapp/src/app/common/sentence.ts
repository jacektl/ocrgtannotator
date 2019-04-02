export class Word {
  constructor(
    public text: string,
    public isSeparator: boolean,
    public startIdx: number,
    public endIdx: number,
  ) {
  }
}

export class Sentence {
  public readonly words = new Array<Word>();

  constructor(
    public text: string,
    public separators: Array<string> = [' ']
  ) {
    let start = 0;
    for (let i = 0; i < text.length; i++) {
      for (const s of separators) {
        if (i + s.length - 1 < text.length) {
          const t = text.substr(i, s.length);
          if (t === s) {
            this.words.push(new Word(text.substring(start, i), false, start, i));
            this.words.push(new Word(text.substring(i, i + s.length), true, i, i + s.length));
            start = i + s.length;
          }
        }
      }
    }
    if (start < text.length) {
      this.words.push(new Word(text.substring(start, text.length), false, start, text.length));
    }
  }

  wordAt(idx: number): Word {
    for (const word of this.words) {
      if (idx >= word.startIdx && idx < word.endIdx) {
        return word;
      }
    }
    return new Word('', false, 0, -1);
  }

  isSeparatorAt(idx: number): boolean {
    if (idx < 0 || idx >= this.text.length) { return false; }
    return this.separators.indexOf(this.text[idx]) >= 0;
  }
}
