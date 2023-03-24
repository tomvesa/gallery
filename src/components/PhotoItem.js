import React from "react";

const PhotoItem = ({data}) => {
console.log("photo item ", data);
    return (
        <li>
            <img src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`} alt="" />
        </li>
    )
}

export default PhotoItem;