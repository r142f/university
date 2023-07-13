package database

import (
	"context"
	"fmt"
	"github.com/reactivex/rxgo/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"lab12/error_texts"
	"lab12/model"
	"time"
)

type Database struct {
	client   *mongo.Client
	database *mongo.Database
	users    *mongo.Collection
	products *mongo.Collection
}

func NewDatabase() *Database {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}
	database := client.Database("lab12")

	return &Database{
		client:   client,
		database: database,
		users:    database.Collection("users"),
		products: database.Collection("products"),
	}
}

func (database *Database) User(id int) rxgo.Observable {
	return rxgo.Defer([]rxgo.Producer{func(_ context.Context, ch chan<- rxgo.Item) {
		res := database.users.FindOne(context.Background(), bson.D{{"_id", id}})
		if err := res.Err(); err != nil {
			ch <- rxgo.Error(fmt.Errorf(error_texts.USER_NOT_FOUND, id))
		} else {
			ch <- rxgo.Of(res)
		}
	}}).Map(func(_ context.Context, i interface{}) (interface{}, error) {
		user := &model.User{}
		err := i.(*mongo.SingleResult).Decode(user)

		return user, err
	})
}

func (database *Database) Users() rxgo.Observable {
	return rxgo.Defer([]rxgo.Producer{func(_ context.Context, ch chan<- rxgo.Item) {
		cursor, err := database.users.Find(context.Background(), bson.D{})
		if err != nil {
			ch <- rxgo.Error(err)
			return
		}

		for cursor.Next(context.Background()) {
			user := &model.User{}
			err := cursor.Decode(user)
			if err != nil {
				ch <- rxgo.Error(err)
			} else {
				ch <- rxgo.Of(user)
			}
		}
	}}).DefaultIfEmpty(nil)
}

func (database *Database) AddUser(user *model.User) rxgo.Observable {
	return rxgo.Defer([]rxgo.Producer{func(_ context.Context, ch chan<- rxgo.Item) {
		res, err := database.users.InsertOne(context.Background(), user)
		if err != nil {
			ch <- rxgo.Error(err)
		} else {
			ch <- rxgo.Of(res)
		}
	}})
}

func (database *Database) Products() rxgo.Observable {
	return rxgo.Defer([]rxgo.Producer{func(_ context.Context, ch chan<- rxgo.Item) {

		cursor, err := database.products.Find(context.Background(), bson.D{})
		if err != nil {
			ch <- rxgo.Error(err)
			return
		}

		for cursor.Next(context.Background()) {
			product := &model.Product{}
			err := cursor.Decode(product)
			if err != nil {
				ch <- rxgo.Error(err)
			} else {
				ch <- rxgo.Of(product)
			}
		}
	}}).DefaultIfEmpty(nil)
}

func (database *Database) AddProduct(product *model.Product) rxgo.Observable {
	return rxgo.Defer([]rxgo.Producer{func(_ context.Context, ch chan<- rxgo.Item) {
		res, err := database.products.InsertOne(context.Background(), product)
		if err != nil {
			ch <- rxgo.Error(err)
		} else {
			ch <- rxgo.Of(res)
		}
	}})
}
