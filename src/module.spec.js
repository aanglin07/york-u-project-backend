import getRated from "./getRatings";
import ratingsFilter from "./filter-ratings";



describe("Ability to search array for products with a rating", () => {

    
    test ("should return all products with a rating", () => {
            const result = getRated()
            console.log(result)
      })
    })
    test("should return products that have a specific rating", () => {

        const result = ratingsFilter(5)
        console.log(result)
    })

    test("should return null for any request outside the range of 1 to 5", () => {

        const result = ratingsFilter(6)
        console.log(result)
        expect(result).toBe(null)
    })

    test("should return null for any request outside the range of 1 to 5", () => {

        const result = ratingsFilter(-1)
        console.log(result)
        expect(result).toBe(null)
    })

    

