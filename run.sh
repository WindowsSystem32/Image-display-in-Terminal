clear
echo -e "\033[0m\033[38;2;255;255;0mTS 컴파일 - config\033[0m"
npm run tsc config.ts --strict true -d --removeComments
echo -e "\033[0m\033[38;2;0;255;0mTS 컴파일 완료 - config\033[0m"
echo -e "\033[0m\033[38;2;255;255;0mTS 컴파일 - main\033[0m"
npm run tsc main.ts --strict true -d --removeComments
echo -e "\033[0m\033[38;2;0;255;0mTS 컴파일 완료 - main\033[0m"
echo -e "\033[0m\033[38;2;0;255;255m실행\033[0m"
node ./main.js
