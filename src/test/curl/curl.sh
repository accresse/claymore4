rm -rf ./target
mkdir target

LOCATION=`curl -i -X POST -H "Content-Type:application/json" -d "@create.json" http://localhost:8080/claymore/api/characters|grep Location|sed -E 's/.*(http.*[0-9]).*/\1/g'`
echo created character at [$LOCATION]

curl -H "Content-Type:application/json" $LOCATION |grep -v href > target/get_after_create.json
echo GET character to get_after_create.json

diff -qw create.json target/get_after_create.json

curl -X PUT -H "Content-Type:application/json" -d "@update.json" $LOCATION |grep -v href > target/get_after_update.json

diff -w update.json target/get_after_update.json
