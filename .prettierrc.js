/**
 * Prettier Configuration
 * 保存時にコードを自動整形するための設定です。
 */
module.exports = {
  printWidth: 120, // 1行の最大文字数
  tabWidth: 2, // インデントの深さ
  useTabs: false, // スペースを使用
  semi: false, // セミコロンを省略
  singleQuote: true, // シングルクォーテーションを強制
  quoteProps: 'preserve', // オブジェクトのキーの引用符を維持
  trailingComma: 'es5', // ES5で有効な末尾のカンマをつける
  bracketSpacing: true, // { a: 1 } のようにスペースを入れる
  arrowParens: 'always', // (x) => ... 引数のカッコを常に付ける
  endOfLine: 'lf', // 改行コードをLFに固定
}
