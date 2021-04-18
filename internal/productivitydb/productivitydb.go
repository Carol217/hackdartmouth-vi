package productivitydb

import (
	"context"

	"github.com/Carol217/hackdartmouth-vi/internal/config"
	"github.com/Carol217/hackdartmouth-vi/internal/database"
	"github.com/Carol217/hackdartmouth-vi/internal/productivitydb/productivity"
	"github.com/spf13/viper"
)

var (
	dbClient = database.MustMongoClient(context.TODO(), "mongodb://localhost:27017")
)

func GetUrlList(username string) ([]productivity.Entry, error) {
	dbName := viper.GetString(config.DBName)
	urlList := dbClient.Database(dbName).Collection("urllist")

	cursor, err := urlList.Find(context.TODO(), productivity.Entry{Username: username})
	if err != nil {
		return nil, err
	}

	var entries []productivity.Entry
	for cursor.Next(context.TODO()) {
		var e productivity.Entry
		if err := cursor.Decode(&e); err != nil {
			return nil, err
		}

		entries = append(entries, e)
	}
	return entries, nil
}

func AddURL(username, url, isProductive string, time int64) error {
	dbName := viper.GetString(config.DBName)
	urlList := dbClient.Database(dbName).Collection("urllist")

	filter := &productivity.Entry{
		Username: username,
		URL:  url,
		IsProductive: isProductive,
	}

	var entry productivity.Entry
	if err := urlList.FindOne(context.TODO(), filter).Decode(&entry); err == nil {
		if err = DeleteURL(username, url, isProductive, entry.Time); err != nil {
			return err
		}
		entry.Time += time;
		_, err = urlList.InsertOne(context.TODO(), entry)
		return err
	}

	filter.Time = time;
	_, err := urlList.InsertOne(context.TODO(), filter)
	return err
}

func DeleteURL(username, url, isProductive string, time int64) error {
	dbName := viper.GetString(config.DBName)
	urlList := dbClient.Database(dbName).Collection("urllist")

	entry := &productivity.Entry{
		Username: username,
		URL:  url,
		Time: time,
		IsProductive: isProductive,
	}
	_, err := urlList.DeleteOne(context.TODO(), entry)
	return err
}