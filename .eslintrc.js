module.exports = {
  root: true,
  env: {
    browser: true, // window や document を使えるようにする
    node: true, // console や process を使えるようにする
    es6: true, // ES6以降の構文を許可
  },
  // 基本的な推奨ルールとPrettier連携のみを適用
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    // 引用符をシングルクォーテーションに統一（エラーで通知）
    'quotes': ['error', 'single'],

    // 教育用に「あえて」オフにする項目
    'no-console': 'off', // 学習中は console.log を多用するため
    'no-unused-vars': 'off', // 未使用変数は無視する
    'no-empty': 'off', // if文の中身が空でもエラーにしない
    'prefer-const': 'off', // 全部 let で書いても怒られないようにする
    'no-irregular-whitespace': 'off', // 全角スペース等でのエラーを防ぐ（初心者に多いため）
  },
}
