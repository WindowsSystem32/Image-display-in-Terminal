@echo off && cls && echo TS ������ - config && npx tsc config.ts --strict true -d --removeComments && echo TS ������ �Ϸ� - config && echo TS ������ - main && npx tsc main.ts --strict true -d --removeComments && echo TS ������ �Ϸ� - main && echo ���� && node main.js && @echo on