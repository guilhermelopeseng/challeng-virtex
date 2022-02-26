package main

import (
  "database/sql"
  _"github.com/go-sql-driver/mysql"
  "github.com/gorilla/mux"
  "net/http"
  "encoding/json"
  "fmt"
  "io/ioutil"
  "github.com/rs/cors"
  "log"
)

type Post struct {

  OntId		int 	`json:"OntId"`
  SnKey 	string 	`json:"SnKey"`
  Slot 		int 	`json:"Slot"`
  Port 		int 	`json:"Port"`
  Status 	string 	`json:"Status"`
}

var db *sql.DB
var err error

func main() {
  db, err = sql.Open("mysql", "root:virtex@tcp(localhost:3306)/virtex")
  if err != nil {
    panic(err.Error())
  }

  defer db.Close()

  router := mux.NewRouter()

  router.HandleFunc("/huawei", getHuawei).Methods("GET")
  router.HandleFunc("/huawei", createHuawei).Methods("POST")
  router.HandleFunc("/zte", getZte).Methods("GET")
  router.HandleFunc("/zte", createZte).Methods("POST")

  c := cors.New(cors.Options{
      AllowedOrigins: []string{"http://localhost:3000"},
      AllowCredentials: true,
  })

  handler := c.Handler(router)
  log.Fatal(http.ListenAndServe(":8000", handler))
}


func getHuawei(w http.ResponseWriter, r *http.Request) {

  w.Header().Set("Content-Type", "application/json")  

  var posts []Post  

  result, err := db.Query("SELECT OntId, SnKey, Slot, Port, Status from Huawei")

  if err != nil {
    panic(err.Error())
  }  
  
  defer result.Close()  

  for result.Next() {
    
    var post Post
    err := result.Scan(&post.OntId, &post.SnKey, &post.Slot, &post.Port, &post.Status)
    
    if err != nil {
      panic(err.Error())
    }
    posts = append(posts, post)
  }  

  json.NewEncoder(w).Encode(posts)
}

func getZte(w http.ResponseWriter, r *http.Request) {

  w.Header().Set("Content-Type", "application/json")  

  var posts []Post  

  result, err := db.Query("SELECT OntId, SnKey, Slot, Port, Status from Zte")

  if err != nil {
    panic(err.Error())
  }  
  
  defer result.Close()  

  for result.Next() {
    
    var post Post
    err := result.Scan(&post.OntId, &post.SnKey, &post.Slot, &post.Port, &post.Status)
    
    if err != nil {
      panic(err.Error())
    }
    posts = append(posts, post)
  }  

  json.NewEncoder(w).Encode(posts)
}

type data struct {
  OntId int
  SnKey string
  Slot int
  Port int
  Status string
}

func createHuawei(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")  

  body, err := ioutil.ReadAll(r.Body)
  
  if err != nil {
    panic(err.Error())
  }

  var keyVal data
  
  json.Unmarshal(body, &keyVal)

  fmt.Println(keyVal.OntId)

  str := fmt.Sprintf("INSERT INTO Huawei VALUES(%d, '%s', %d, %d, '%s')", keyVal.OntId, keyVal.SnKey, keyVal.Slot, keyVal.Port, keyVal.Status)

  fmt.Println(str)
  result, err := db.Query(str)

  if err != nil {
    panic(err.Error())
  }  
  
  defer result.Close()

}

func createZte(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")  

  body, err := ioutil.ReadAll(r.Body)
  
  if err != nil {
    panic(err.Error())
  }

  var keyVal data
  
  json.Unmarshal(body, &keyVal)

  fmt.Println(keyVal.OntId)

  str := fmt.Sprintf("INSERT INTO Zte VALUES(%d, '%s', %d, %d, '%s')", keyVal.OntId, keyVal.SnKey, keyVal.Slot, keyVal.Port, keyVal.Status)

  fmt.Println(str)
  result, err := db.Query(str)

  if err != nil {
    panic(err.Error())
  }  
  
  defer result.Close()

}