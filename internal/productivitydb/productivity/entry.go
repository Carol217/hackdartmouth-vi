package productivity

type Entry struct {
	Username string `bson:"username,omitempty" json:"username"`
	URL string `bson:"url,omitempty" json:"url"`
	Time int64 `bson:"time,omitempty" json:"time"`
	IsProductive string `bson:"isProductive,omitempty" json:"isProductive"`
}