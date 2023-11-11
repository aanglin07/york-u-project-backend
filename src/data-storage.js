//This module is used for temporary data storage in the form of arrays

const jerseyRatings = [
    {
        jerseyID: 2,
        rating : 0,
    },
    {
        jerseyID: 3,
        rating: 0

    },
    {
        jerseyID: 3,
        rating: 5
    },
    {
        jerseyID: 3,
        rating: 1
    },
    {
        jerseyID: 3,
        rating: 1
    }
]

const jerseyData = [
    {
      id: 1,
      img: "https://drive.google.com/uc?export=view&id=1WFPZvR8hCciiBo7oahgOQo4RwT16T68u",
      teamName: "Manchester United",
      teamKit: "Home Kit",    
      Year: "2023",
      description:"Like club, like city. Show your team's colors with pride in the Manchester United 23/24 Home Jersey. The jersey forms a cast iron link to Manchester's enduring influence around the globe. Taking design elements from a nearby Industrial Revolution-era bridge, it displays a repeating Lancashire Rose-inspired geometric pattern on the front. Sweat-wicking AEROREADY and lightweight team details make it ideal for the pitch — whether you're gearing up for an international match or your local 5-a-side.",
      leagueName: "English Premier League",
      purchaseLink:"https://premiumsoccer.com/products/manchester-united-23-24-home-jersey-ip1726?variant=40194965733510"
    },
    {
      id:2,
      img: "https://drive.google.com/uc?export=view&id=10unvUdc3W8fzmWnGOPjfnH3_OliNf3lv",
      teamName: "Real Madrid",
      teamKit: "Home Kit",
      Year: "2023",
      description:"Clean, classic and created to mark a milestone. The timeless look of this adidas Real Madrid home jersey is accented with light purple details and a repeated club badge embossed onto the white fabric. This version of the shirt is made to keep fans comfortable with moisture-wicking AEROREADY. A 120 años signoff celebrates 120 years of regal football Made with 100% recycled materials, this product represents just one of our solutions to help end plastic waste.",
      leagueName: "La Liga",
      purchaseLink:"https://premiumsoccer.com/products/real-madrid-23-24-home-jersey-hr3796?variant=40192321847430&currency=CAD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gclid=CjwKCAjwoqGnBhAcEiwAwK-OkXsm2oXszMdFGYNU7sSWEUWFrIqcVoCqoFBe0Wgu-E86Pj3-2oiNwxoC1yMQAvD_BwE",
    },
  
    {
      id:3,
      img: "https://drive.google.com/uc?export=view&id=10yOPZcu8yKuFAeHzYhVzGld2eMS5kw6v",
      teamName: "Juventus",
      teamKit: "Home Kit",
      Year: "2023",
      description:"Calling all Juve fans. Nostalgic style meets modern sports technology in the Juventus 23/24 Home Jersey. Rooted in club heritage, the jersey takes its inspiration from vintage black and white kits. An embroidered club badge and flashes of yellow complete the standout look. Crafted from lightweight recycled polyester, the jersey features sweat-wicking AEROREADY fabric and mesh inserts at the side for ultimate comfort on-and-off the pitch. The result? Over 120 years of team pride for one of the world's greatest teams stitched into an authentic, high-performance jersey.",
      leagueName: "Serie A",
      purchaseLink:"https://premiumsoccer.com/products/juventus-23-24-home-jersey-hr8256?variant=40185936019590&currency=CAD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gclid=CjwKCAjwoqGnBhAcEiwAwK-OkcQqwPCBiurZDHDZ22Q61GaeddLFN9QDdbq8z3ymoDMrSqaK_14-ERoCoAwQAvD_BwE"
    },
    {
      id:4,
      img: "https://drive.google.com/uc?export=view&id=1l3F31hVJuyXqhQf7PEqQ7_LT4uflz5yr",
      teamName: "Manchester United",
      teamKit: "Home Kit",    
      Year: "2022",
      description:"Turned up or pressed down, the humble polo collar has played a starring role in many of Manchester United's biggest moments. Making a comeback on this adidas football jersey, it joins a shield-style badge and engineered pinstripe graphic to produce an eye-catching look. Moisture-absorbing AEROREADY and mesh panels make it a comfortable choice for passionate supporters. Made with 100% recycled materials, this product represents just one of adidas's solutions to help end plastic waste." ,
      leagueName: "English Premier League",
      purchaseLink:"https://www.sportchek.ca/en/pdp/manchester-united-fc-2022-23-adidas-men-s-replica-soccer-jersey-man-utd-football-epl-65031015f.333923339.html?gclid=CjwKCAjwoqGnBhAcEiwAwK-OkTjiyeOdoevznMyWnEeSKJ3w9wg0J5D-ClSX6GABbVilZaolri_z1hoC6OkQAvD_BwE&gclsrc=aw.ds"
    }
  ]
  
  const League = [
    {
      id:1,
      leagueName: "English Premier League"
    },
    {
      id:2,
      leagueName: "La Liga"
    },
    {
      id:3,
      leagueName: "Serie A"
    }
  ]

  const Team = [
    {
      id:1,
      teamName: "Manchester United"
    },
    {
      id:2,
      teamName:"Real Madrid"
    },
    {
      id:3,
      teamName:"Juventus"
    }
  ]

  const users = [
    {
      username: "admin@test.com", 
      password: "$argon2i$v=19$m=16,t=2,p=1$S1BoWmd0SU9mdUdiVWh1Wg$QF+EAsI+2rKW/PTSKROSWg"
    }
  ]
  
  export {jerseyData, jerseyRatings, League, Team, users};
