package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type data struct {
	Data []location `json:"data"`
}

type location struct {
	LocationID string `json:"location_id"`
	Name string `json:"name"`
	Latitude string `json:"latitude"`
	Longitude string `json:"longitude"`
	NumReviews string `json:"num_reviews"`
	Timezone string `json:"timezone"`
	LocationString string `json:"location_string"`
	Photo photo `json:"photo"`
	RankingCategory string `json:"ranking_category"` //do I need this?
	Distance string `json:"distance"`
	DistanceString string`json:"distance_string"`
	Bearing string `json:"bearing"`
	Rating string `json:"rating"`
	IsClosed bool `json:"is_closed"`
	OpenNowText string `json:"open_now_text"`
	IsLongClosed bool `json:"is_long_closed"`
	PriceLevel string `json:"price_level"`
	Description string `json:"description"`
	WebUrl string `json:"web_url"`
	Ancestors []ancestor `json:"ancestors"`
	Category subcat `json:"category"`
	Subcategory []subcat `json:"subcategory"`
	ParentDisplayName string `json:"parent_display_name"`
	Phone string `json:"phone"`
	Website string `json:"website"`
	AddressObj address `json:"address_obj"`
	Address string `json:"address"`
	Hours hours `json:"hours"`
	Cuisine []subcat `json:"cuisine"`
	DietaryRestrictions []subcat `json:"dietary_restrictions"`
	Booking booking `json:"booking"`
	ReserveInfo reserve `json:"reserve_info"`
	EstablishmentTypes []subcat `json:"establishment_types"`
}

type photo struct {
	Images images `json:"images"`
}

type images struct {
	Large large `json:"large"`
}

type large struct {
	Width string `json:"width"`
	Height string `json:"height"`
	Url string `json:"url"`
}

type ancestor struct {
	Subcategory []subcat `json:"subcategory"`
	Name string `json:"name"` //will this work?
	Abbrv string `json:"abbrv"`
	LocationId string `json:"location_id"` //will this work?
}

type subcat struct {
	Key string `json:"key"`
	Name string `json:"name"` //will this work?
}

type address struct {
	Street1 string `json:"street1"`
	Street2 string `json:"street2"`
	City string `json:"city"`
	State string `json:"state"`
	Country string `json:"country"`
	Postalcode string `json:"postalcode"`
}

type hours struct {
	WeekRanges [][]openingTimes `json:"week_ranges"`
	Timezone string `json:"timezone"`
}

type openingTimes struct {
	OpenTime int `json:"open_time"`
	CloseTime int `json:"close_time"`
}

type booking struct {
	Provider string `json:"provider"`
	Url string `json:"url"`
}

type reserve struct {
	Id string `json:"id"`
	Provider string `json:"provider"`
	ProviderImg string `json:"provider_img"`
	Url string `json:"url"`
}

type OfficeLocations struct {
	locationName string
	lat          float64
	lon          float64
	fileName     string
}

func main() {
	officeLocationList := []OfficeLocations{
		{"Belgrave House", 51.49503669003621, -0.14656206805342872, "assets/Belgrave_restaurants.json"},
		{"Sussex House", 50.95495279640914, -0.13450254366253722, "assets/Sussex_restaurants.json"},
		{"1 John Street", 50.823610636478065, -0.13300841299908156, "assets/John_street_restaurants.json"},
	}

	for _, officeLocation := range officeLocationList {
		apiCallForRestaurantsByLocation(officeLocation.lat, officeLocation.lon, officeLocation.fileName)
		fmt.Printf("Successfully obtained restaurants at location %s\n", officeLocation.locationName)
	}
}

func apiCallForRestaurantsByLocation(lat, lon float64, fileName string) {
	err := godotenv.Load("../.env")
	if err != nil {
		panic(err)
	}
	apiKey := os.Getenv("TRAVEL_ADVISOR_API_KEY")

	url := fmt.Sprintf("https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=%f&longitude=%f&distance=1&lunit=mi", lat, lon)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		panic(err)
	}

	req.Header.Add("x-rapidapi-host", "travel-advisor.p.rapidapi.com")
	req.Header.Add("x-rapidapi-key", apiKey)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}

	defer res.Body.Close()

	d := data{}


	// decode response into data struct
	err = json.NewDecoder(res.Body).Decode(&d)
	if err != nil {
		panic(err)
	}

	filteredD := data{[]location{}}

	// filter out the ads
	for _, el := range d.Data {
		if el.Name != "" {
			filteredD.Data = append(filteredD.Data, el)
		}
	}

	// convert data to json
	body, err := json.Marshal(&filteredD)
	if err != nil {
		panic(err)
	}

	// write json in file
	err = ioutil.WriteFile(fileName, body, 0644)
	if err != nil {
		panic(err)
	}

}