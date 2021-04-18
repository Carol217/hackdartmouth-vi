package views

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/Carol217/hackdartmouth-vi/internal/productivitydb"
	"github.com/PGo-Projects/webresponse"
	"github.com/go-chi/chi"
)

var (
	ErrInternalServer = errors.New("We're sorry, but something unexpected occured!  Please try again later.")
)

func RegisterAPIEndpoints(mux *chi.Mux) {
	mux.Post("/api/add_url", addURL)
	mux.Post("/api/get_urls", getURLs)
}

func addURL(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	url := r.FormValue("url") 	
	elapsedTime, _ := strconv.ParseInt(r.FormValue("elapsedTime"), 10, 64)
	username := r.FormValue("username")
	isProductive := r.FormValue("productivity")
	
	if err := productivitydb.AddURL(username, url, isProductive, elapsedTime); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func getURLs(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	username := r.FormValue("username")
	
	urllist, err := productivitydb.GetUrlList(username)
	if err != nil {
		response := webresponse.Error(ErrInternalServer)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(response)
		return
	}
	
	response, err := json.Marshal(urllist)
	if err != nil {
		response := webresponse.Error(ErrInternalServer)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(response)
		return
	}
	
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}