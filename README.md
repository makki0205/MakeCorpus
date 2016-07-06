# 概要
ユニボと会話をしながらユニボの返事を指摘することで質の高いcorpusを作成するツールです

## 使い方
0.[http://makki0250.com:3000/](http://makki0250.com:3000/)にアクセししてください

1. 会話をテキストエリアに打ち込みます

2. 会話をPOSTします

3. ユニボから返事が返ってきます

4. 返事がふさわしくないかったらその文をクリックして編集します。

5. 1~4を繰り返して終わる時にEXPORTを押すとサーバにそのcorpusがたまります

##corpusの回収方法
* [http://makki0250.com:3000/corpus.txt](http://makki0250.com:3000/corpus.txt)にアクセスしてダウンロードする
* `curl makki0250.com:3000/corpus.txt -o "任意の名前"` を叩く
