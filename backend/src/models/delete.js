// testing below
      const dietGet = await Diet.findById(createdDiet._id).populate(
        {
          path: "user",
          select: "-password -refreshToken"
        }
      )
      .populate("foodItems")
      console.log("findbyIDDIET:: ", dietGet)