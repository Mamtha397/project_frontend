import React, {useState, useEffect} from "react"

export default function Create (props) {
    const [name, setName] = useState("");
    const [sector, setSector] = useState("");
    const [isAgree, setIsAgree] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [id, setId] = useState();

    const handleSubmit = () =>{

        if(name.length<3 || sector.length==0){
            setError(true);
            setErrorMessage("All Field are manditory");
            return;
        }
        var myHeaders = new Headers();
        var urlencoded = new URLSearchParams();
        var requestOptions;
        if(isEditMode){
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
            urlencoded.append("name", name);
            urlencoded.append("sector", sector);
            urlencoded.append("isAgree", isAgree === true ? 1: 0);
    
            requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };
    
            fetch("http://localhost:3000/api/update/"+id, requestOptions)
            .then(response => response.text())
            .then(result => {
                alert("Updated SuccessFully");
                window.location.href = "/dashboard";
            })
            .catch(error => console.log('error', error));
        }
        else{
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
            urlencoded.append("name", name);
            urlencoded.append("sector", sector);
            urlencoded.append("isAgree", isAgree === true ? 1: 0);
    
            requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };
    
            fetch("http://localhost:3000/api/create", requestOptions)
            .then(response => response.text())
            .then(result => {
                alert("Created SuccessFully");
                window.location.href = "/dashboard";
            })
            .catch(error => console.log('error', error));
        }

        
    }

    useEffect(()=>{
        var query = window.location.search.substring(1);
        const id = query.split("=")[1];
        if(id){
            setId(id);
            setIsEditMode(true);
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch("http://localhost:3000/api/getData/"+id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setName(result.message[0].name);
                    setSector(result.message[0].sector);
                    setIsAgree(result.message[0].isAgree === 1 ?true:false)
                })
                .catch(error => console.log('error', error));
        }
    },[])
  
    return (
      <div className="Create-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Create Data</h3>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="name"
                className="form-control mt-1"
                placeholder="Enter name"
                value={name}
                onChange={(e)=>{
                    setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{marginRight:"5px"}}>Select Sector</label>
              <select value={sector} onChange={(e)=>{
                  console.log(e.target,'1234')
                  setSector(e.target.value);
              }}>
                  <option value="" disabled selected>Select Sector</option>
                  <option value="1">Manufacturing</option>
         <option value="19">Construction materials</option>
         <option value="18">Electronics and Optics</option>
         <option value="6">Food and Beverage</option>
         <option value="342">Bakery &amp; confectionery products</option>
         <option value="43">Beverages</option>
         <option value="42">Fish &amp; fish products </option>
         <option value="40">Meat &amp; meat products</option>
         <option value="39">Milk &amp; dairy products </option>
         <option value="437">Other</option>
         <option value="378">Sweets &amp; snack food</option>
         <option value="13">Furniture</option>
         <option value="389">Bathroom/sauna </option>
         <option value="385">Bedroom</option>
         <option value="390">Children’s room </option>
         <option value="98">Kitchen </option>
         <option value="101">Living room </option>
         <option value="392">Office</option>
         <option value="394">Other (Furniture)</option>
         <option value="341">Outdoor </option>
         <option value="99">Project furniture</option>
         <option value="12">Machinery</option>
         <option value="94">Machinery components</option>
         <option value="91">Machinery equipment/tools</option>
         <option value="224">Manufacture of machinery </option>
         <option value="97">Maritime</option>
         <option value="271">Aluminium and steel workboats </option>
         <option value="269">Boat/Yacht building</option>
         <option value="230">Ship repair and conversion</option>
         <option value="93">Metal structures</option>
         <option value="508">Other</option>
         <option value="227">Repair and maintenance service</option>
         <option value="11">Metalworking</option>
         <option value="67">Construction of metal structures</option>
         <option value="263">Houses and buildings</option>
         <option value="267">Metal products</option>
         <option value="542">Metal works</option>
         <option value="75">CNC-machining</option>
         <option value="62">Forgings, Fasteners </option>
         <option value="69">Gas, Plasma, Laser cutting</option>
         <option value="66">MIG, TIG, Aluminum welding</option>
         <option value="9">Plastic and Rubber</option>
         <option value="54">Packaging</option>
         <option value="556">Plastic goods</option>
         <option value="559">Plastic processing technology</option>
         <option value="55">Blowing</option>
         <option value="57">Moulding</option>
         <option value="53">Plastics welding and processing</option>
         <option value="560">Plastic profiles</option>
         <option value="5">Printing </option>
         <option value="148">Advertising</option>
         <option value="150">Book/Periodicals printing</option>
         <option value="145">Labelling and packaging printing</option>
         <option value="7">Textile and Clothing</option>
         <option value="44">Clothing</option>
         <option value="45">Textile</option>
         <option value="8">Wood</option>
         <option value="337">Other (Wood)</option>
         <option value="51">Wooden building materials</option>
         <option value="47">Wooden houses</option>
         <option value="3">Other</option>
         <option value="37">Creative industries</option>
         <option value="29">Energy technology</option>
         <option value="33">Environment</option>
         <option value="2">Service</option>
         <option value="25">Business services</option>
         <option value="35">Engineering</option>
         <option value="28">Information Technology and Telecommunications</option>
         <option value="581">Data processing, Web portals, E-marketing</option>
         <option value="576">Programming, Consultancy</option>
         <option value="121">Software, Hardware</option>
         <option value="122">Telecommunications</option>
         <option value="22">Tourism</option>
         <option value="141">Translation services</option>
         <option value="21">Transport and Logistics</option>
         <option value="111">Air</option>
         <option value="114">Rail</option>
         <option value="112">Road</option>
         <option value="113">Water</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <input type="checkbox" 
                checked={isAgree}
                onChange={(e)=>{
                    setIsAgree(e.target.checked);
                }}/>
              <label style={{marginLeft:"5px"}}>is Agree</label>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={handleSubmit} type="button" className="btn btn-primary">
                Create
              </button>
            </div>
            {error &&
                <div className="d-grid gap-2 mt-3">
                    <label>{errorMessage}</label>
                </div>
              }
          </div>
        </form>
      </div>
    )
  }