// testing below
      const dietGet = await Diet.findById(createdDiet._id).populate(
        {
          path: "user",
          select: "-password -refreshToken"
        }
      )
      .populate("foodItems")
      console.log("findbyIDDIET:: ", dietGet)



        return (
    <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {/* {dietArr && JSON.stringify(dietArr)} */}
        {dietArr && 
        dietArr.map(food=>(
            <div 
            className="flex"
            key={food._id}>
                {Object.keys(food).filter(key=>key!=='_id').map(key=>(

                        <p key={key}>{food[key]}</p>
                ))}
            </div>
        ))
        }
    </div>
  );
}
