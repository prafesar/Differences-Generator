#!/bin/bash
echo ''
echo '------------------------------------------------------------------------------------'
echo 'VERSION: gendiff -V'
echo '------------------------------------------------------------------------------------'
gendiff -V
echo ''
echo ''
echo '------------------------------------------------------------------------------------'
echo 'HELP: gendiff --help'
echo '------------------------------------------------------------------------------------'
gendiff --help
echo ''
echo ''
echo '------------------------------------------------------------------------------------'
echo 'Testing Relative Path With JSON Format'
echo '------------------------------------------------------------------------------------'
gendiff --format json __test__/__fixtures__/before.ini __test__/__fixtures__/after.ini
echo ''
echo ''
echo '------------------------------------------------------------------------------------'
echo 'Testing Absolute Path With JSON format:'
echo '------------------------------------------------------------------------------------'
gendiff --format json /workspace/Differences-Generator/__test__/__fixtures__/before.ini __test__/__fixtures__/after.ini  /workspace/Differences-Generator/__test__/__fixtures__/before.ini __test__/__fixtures__/after.yaml
echo ''
echo ''
echo '------------------------------------------------------------------------------------'
echo 'PLAIN ---> gendiff --format plain before.json after.json'
echo '------------------------------------------------------------------------------------'
cd __test__/__fixtures__ && gendiff --format plain before.json after.json
echo ''
echo ''
echo '------------------------------------------------------------------------------------'
echo 'THREE ---> gendiff --format three before.yaml after.yaml'
echo '------------------------------------------------------------------------------------'
gendiff --format three before.yaml after.yaml
echo ''
echo ''
echo '------------------------------------------------------------------------------------'
echo 'JSON ---> gendiff --format json before.ini after.json'
echo '------------------------------------------------------------------------------------'
gendiff --format json before.ini after.json

cd ../..