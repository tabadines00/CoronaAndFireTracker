import React from 'react';
const FireDataEdit = () => {
    const [result, setResult] = React.useState(null);
    React.useEffect(() => {
        //need account's county area
        let countyArea;
        let name;
        fetch('http://localhost:5000/wildfire/countie/')
        .then(res => res.json())
        .then(resData => {
            console.log(resData);
            setResult(resData);
        })
        .catch((e) => {
            console.log(e);
            setResult("None");
        });

    });

    return (
        <div>
            <div className="top-right">
                <div>name</div>
                <div className = "county-area">County Area : {result.incident_county}</div>
            </div>
            <div className = "middle">

                <div className = "county-info-stat">
                    <div>Location : {result.incident_location}</div>
                    <div>Acres Burned : {result.incident_acres_burned}</div>
                    <div>Containment : {result.incident_containment}</div>
                    <div>Control : {result.incident_control}</div>
                    <div>Corporating Agencies : {result.incident_cooperating_agencies}</div>
                    <div>Incident Type : {result.incident_type}</div>
                    <div>Active : {result.is_active}</div>
                    <div>Date Created : {result.incident_dateonly_created}</div>
                    <div>Date Extinguished : {result.incident_dateonly_extinguished}</div>
                </div>
                 
                <form action = "" method = "POST" className = "form-data-edit" onsubmit = "" encType = "application/x-www-form-urlencoded">
                    <div>Change/Update Data</div>

                    <label for = "location">Location : </label>
                    <input id ="location"></input>
                    <label for = "acres_burned">Acres Burned : </label>
                    <input id ="acres_burned"></input>
                    <label for = "containment">Containment : </label>
                    <input id ="containment"></input>
                    <label for = "control">Control : </label>
                    <input id ="control"></input>
                    <label for = "corp-agencies">Corporating Agencies : </label>
                    <input id ="corp-agencies"></input>
                    <label for = "type">Incident Type : </label>
                    <input id ="type"></input>
                    <label for = "active">Active : </label>
                    <input id ="active"></input>
                    <label for = "created">Date Created : </label>
                    <input id ="created"></input>
                    <label for = "extinguished">Date Extinguished : </label>
                    <input id ="extinguished"></input>

                    <label for="evacLevel">Evacuation Level</label>
                    <select id="evacLevel" >
                        <option value="1" selected>L1</option>
                        <option value="2">L2</option>
                        <option value="3">L3</option>
                    </select>
                    <div className ="button-data-edit">
                        <input type = "submit"></input>
                    </div>
                </form>

            </div>

        </div>
    );

}

export default FireDataEdit;