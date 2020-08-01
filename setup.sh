#mongo << ~EOF
#use campush;
#db.clubs.drop();
#~EOF
mongoimport -d campush -c clubs clubs.db
mongoimport -d campush -c categories categories.db