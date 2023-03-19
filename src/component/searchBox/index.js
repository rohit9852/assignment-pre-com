import React, { useEffect, useState, useRef } from "react";
import UserCard from "../UserCard";
// import axios from 'axios'

const userList = [
  {
    id: "123-s2-546",
    name: "John Jacobs",
    items: ["bucket", "bottle"],
    address: "1st Cross, 9th Main, abc Apartment",
    pincode: "5xx012"
  },
  {
    id: "123-s3-146",
    name: "David Mire",
    items: ["Bedroom Set"],
    address: "2nd Cross, BTI Apartment",
    pincode: "4xx012"
  },
  {
    id: "223-a1-234",
    name: "Soloman Marshall",
    items: ["bottle"],
    address: "Riverbed Apartment",
    pincode: "4xx032"
  },
  {
    id: "121-s2-111",
    name: "Ricky Beno",
    items: ["Mobile Set"],
    address: "Sunshine City",
    pincode: "5xx072"
  },
  {
    id: "123-p2-246",
    name: "Sikander Singh",
    items: ["Air Conditioner"],
    address: "Riverbed Apartment",
    pincode: "4xx032"
  },
  {
    id: "b23-s2-321",
    name: "Ross Wheeler",
    items: ["Mobile"],
    address: "1st Cross, 9th Main, abc Apartement",
    pincode: "5xx012"
  },
  {
    id: "113-n2-563",
    name: "Ben Bish",
    items: ["Kitchen Set", "Chair"],
    address: "Sunshine City",
    pincode: "5xx072"
  },
  {
    id: "323-s2-112",
    name: "John Michael",
    items: ["Refrigerator"],
    address: "1st Cross, 9th Main, abc Apartement",
    pincode: "5xx012"
  },
  {
    id: "abc-34-122",
    name: "Jason Jordan",
    items: ["Mobile"],
    address: "Riverbed Apartment",
    pincode: "4xx032"
  }
];

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userList);
  const [isActiveKey, setIsActiveKey] = useState(false);
  const [selected, setSelected] = useState(0);
  const valueRef = useRef();

  //  TODO: api call
  // useEffect(()=>{
  //   axios.get('http://www.mocky.io/v2/5ba8efb23100007200c2750c').then((res)=>{
  //     console.log(res.data)
  //   }).catch(()=>{

  //   })
  // },[])

  const queryMatch = (query, string) => {
    let newString = string.replace(
      new RegExp(query, "gi"),
      (match) => `<span style="color: blue;">${match}</span>`
    );
    return newString;
  };

  const handleSearch = (event) => {
    const newQuery = event.target.value.toLowerCase();
    setQuery(newQuery);

    const newFilteredUsers = userList
      .filter(
        (user) =>
          user.name.toLowerCase().includes(newQuery) ||
          user.id.toString().includes(newQuery) ||
          user.address.toLowerCase().includes(newQuery) ||
          user.pincode.toString().includes(newQuery) ||
          user.items.some((item) => item.toLowerCase().includes(newQuery))
      )
      .map((item) => {
        queryMatch(item.name, newQuery);
        let newName = item.name.replace(
          new RegExp(newQuery, "gi"),
          (match) => `<span style="color: blue;">${match}</span>`
        );
        let newId = item.id.replace(
          new RegExp(newQuery, "gi"),
          (match) => `<span style=" color: blue;">${match}</span>`
        );
        let newAddress = item.address.replace(
          new RegExp(newQuery, "gi"),
          (match) => `<span style=" color: blue;">${match}</span>`
        );
        let newPincode = item.pincode.replace(
          new RegExp(newQuery, "gi"),
          (match) => `<span style=" color: blue;">${match}</span>`
        );
        return {
          ...item,
          name: newName,
          id: newId,
          address: newAddress,
          pincode: newPincode
        };
      });

    setFilteredUsers(newFilteredUsers);
  };

  function handleMouseOver(index) {
    setIsActiveKey(true);
    setSelected(index);
  }

  function handleKeyUpDown(e) {
    if (e.keyCode === 38) {
      if (selected === 0) {
        return;
      } else {
        valueRef[selected - 1].scrollIntoView();
        setSelected(selected - 1);
      }
    } else if (e.keyCode === 40) {
      if (selected === filteredUsers.length - 1) {
        console.log(selected);
        return;
      }
      valueRef[selected + 1].scrollIntoView();
      setSelected(selected + 1);
    }
  }

  return (
    <div>
      <div className={"inputbox"}>
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={handleSearch}
          onKeyDown={(e) => handleKeyUpDown(e)}
        />
      </div>
      <div className="user-card-list">
        {filteredUsers.length ? (
          filteredUsers.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              index={index}
              query={query}
              selected={selected}
              handleMouseOver={handleMouseOver}
              handleKeyUpDown={handleKeyUpDown}
              isActiveKey={isActiveKey}
              valueRef={valueRef}
            />
          ))
        ) : (
          <div className="card"> Not Found </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
