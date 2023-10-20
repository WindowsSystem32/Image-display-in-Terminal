const config: {
  list: Array<string>, 
  index: number, 
  xM: number, 
  yM: number, 
} = {
  list: [ //이미지 리스트
    "test_images/nixie.jpeg", 
  ], 
  index: 0, //main.ts에서 띄울 이미지의 인덱스 (예를 들어 list[0] = "a.jpg"이고 index = 0이면 a.jpg가 띄워집니다.)
  xM: 1.25, //1 글자가 몇 픽셀에 대응되는지 (가로)
  yM: 1.25, //1 글자가 몇 픽셀에 대응되는지 (세로)
};

//나중에는 arguments로 동작할 수 있도록 수정할 예정임다;; ㅎㅎ

module.exports = config;
