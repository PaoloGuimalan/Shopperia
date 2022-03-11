import React, { useState, useEffect } from 'react'
import './css/ProductsDashboard.css'
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SET_PRODUCTS } from '../Redux/types/types';
import { Link } from 'react-router-dom';

function ProductsDashboard() {

  const [inputsprod, setinputsprod] = useState(true);
  const [imgfile, setimgfile] = useState();
  const [imgdatapath, setimgdatapath] = useState()
  const arrayImages = [];

  const [prname, setprname] = useState("");
  const [prdesc, setprdesc] = useState("");
  const [prcat, setprcat] = useState("");
  const [prbrand, setprbrand] = useState("");

  const proDs = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [blur, setblur] = useState(false);
  // const [firstside, setfirstside] = useState(false);

  const [numbertypes, setnumbertypes] = useState(0);
  const [numbersizes, setnumbersizes] = useState(0);

  const [btnstatus, setbtnstatus] = useState(true);
  const [btnstatustype, setbtnstatustype] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:3001/getProducts').then((response) => {
      dispatch({type: SET_PRODUCTS, products: response.data});
      // console.log(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [proDs]);

  const fileGetter = () => {
    const fileinp = document.getElementById("img_selector");

    for(var i = 0; i < fileinp.files.length; i++){
      arrayImages.push(fileinp.files[i]);
    }
  }

  const fileProceeder = async () => {

    function makeid(length) {
        var result           = '';
        var characters       = '0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
      }
      return result;
    }

    const product_id_beta = prname+"_"+makeid(7);
    const product_id = product_id_beta.split(" ").join("");

    const form = new FormData();
    form.append('img', imgfile);
    form.append('prname', prname);
    form.append('prdesc', prdesc);
    form.append('prcat', prcat);
    form.append('prbrand', prbrand);
    form.append('product_id', product_id);

    // console.log("Sizes: "+numbersizes+" | "+"Types: "+numbertypes);

    const subForm = new FormData();
    subForm.append(`numbertypes`, numbertypes);
    subForm.append(`numbersize`, numbersizes);
    subForm.append(`product_id`, product_id);

    for(var i = 0; i < numbertypes; i++){
      const typesValue = document.getElementById(`type_${i}`).value;
      const fileValue = document.getElementById(`file_${i}`);

      subForm.append(`subImg${i}`, fileValue.files[0]);
      subForm.append(`typename${i}`, typesValue);
      // console.log(fileValue.files[0]);
      for(var j = 0; j < numbersizes; j++){
        const sizesValue = document.getElementById(`size_${j}_${i}`).value;
        const sizesVariety = document.getElementById(`variety_${j}_${i}`).value;
        const sizesPrice = document.getElementById(`price_${j}_${i}`).value;
        // console.log(`${typesValue}: ${sizesValue} from sizes_${j}_${i} | Variety: ${sizesVariety} | Price: ${sizesPrice}`);
        //CONSOLE LOG WORKING DATA!!!!!!!!!!!!!
        subForm.append(`sizeValue_${j}_${i}`, sizesValue);
        subForm.append(`sizeVariety_${j}_${i}`, sizesVariety);
        subForm.append(`sizePrice_${j}_${i}`, sizesPrice);
      }
    }

    try{
      await Axios.all([
        Axios.post('http://localhost:3001/createPostProduct', form, {
          headers: {
            "x-access-tokenseller": localStorage.getItem("tokenseller"),
            "Content-Type": 'multipart/form-data'
          },
        }).then((response) => {
          const { fileName, filePath } = response.data;
          setimgdatapath({fileName, filePath});
          // console.log(imgdatapath);
        }),
        Axios.post('http://localhost:3001/subproducts', subForm, {
          headers: {
            "x-access-tokenseller": localStorage.getItem("tokenseller"),
            "Content-Type": 'multipart/form-data'
          },
        }).catch((err) => {
          console.log(err);
        })
      ])
  }
  catch(err){
    console.log(err);
  }

}

  const initiateProd = () => {
    // document.getElementById("ul_content_products").style.filter = "blur(3px)";
    setblur(!blur);
    setinputsprod(!inputsprod);
  }

  const firstInputs = () => {
    const inputsone = document.querySelector('#firstnav');
    const inputssec = document.querySelector('#secondnav');
    inputssec.style.display = 'none';
    inputsone.style.display = 'block';
  }

  const secondInputs = () => {
    const inputsone = document.querySelector('#firstnav');
    const inputssec = document.querySelector('#secondnav');
    inputsone.style.display = 'none';
    inputssec.style.display = 'block';
  }

  const secondNav = () => {
    setbtnstatus(false);
    setnumbertypes(numbertypes + 1);
    // console.log(numbertypes);
    var li_main = document.createElement('li');
    li_main.className = 'inputs_info_nav second_nav_li';
    li_main.id = `li_main_inputs_${numbertypes}`

    var file_input = document.createElement('input');
    file_input.type = 'file';
    file_input.name = `file_${numbertypes}`;
    file_input.id = `file_${numbertypes}`
    

    var li_input = document.createElement('input');

    li_input.type = 'text';
    li_input.placeholder = `Name of Type ${numbertypes}`;
    li_input.name = `type_${numbertypes}`;
    li_input.id = `type_${numbertypes}`;

    li_main.appendChild(li_input);
    li_main.appendChild(file_input);
    document.getElementById('nav_appends').appendChild(li_main);
  }

  const createSizes = () => {
    if(numbersizes > 0){
      setbtnstatustype(true);
    }
    else{
      setbtnstatustype(false);
    }

    setnumbersizes(numbersizes + 1);
    
    for(var i = 0; i < numbertypes; i++){
      var navSizes = document.createElement('nav');
      navSizes.className = 'nav_infos';

      var li_size = document.createElement('li');
      li_size.className = 'inputs_info_nav';

      var inputSizeName = document.createElement('input');
      inputSizeName.type = 'text';
      inputSizeName.placeholder = `Name of Size ${numbersizes}`;
      inputSizeName.name = `size_${numbersizes}_${i}`;
      inputSizeName.id = `size_${numbersizes}_${i}`;

      var inputSizeVariety = document.createElement('input');
      inputSizeVariety.type = 'number';
      inputSizeVariety.placeholder = `Variety ${numbersizes}`;
      inputSizeVariety.name = `vareity_${numbersizes}_${i}`;
      inputSizeVariety.id = `variety_${numbersizes}_${i}`;

      var inputSizePrice = document.createElement('input');
      inputSizePrice.type = 'number';
      inputSizePrice.placeholder = `Price`;
      inputSizePrice.name = `price_${numbersizes}_${i}`;
      inputSizePrice.id = `price_${numbersizes}_${i}`;

      li_size.appendChild(inputSizeName)
      li_size.appendChild(inputSizeVariety)
      li_size.appendChild(inputSizePrice)
      navSizes.appendChild(li_size);

      document.getElementById(`li_main_inputs_${i}`).appendChild(navSizes);
      // console.log(i)
    }
  }

  // const DataProducts = () => {
  //   return(
      
  //   )
  // }

  return (
    <div id='div_productsdash'>
      <motion.div 
      animate={{
        height: inputsprod? "0px" : "auto",
        border: inputsprod? "none" : "solid 2px",
        borderImage: inputsprod? "none" : "linear-gradient(#e10013, #D60789) 1"
      }}
      id='div_float'>
        <nav id='nav_inputsprod'>
          <li>
            <h3 id='label_nav_pro'>Fill Up Product Information.</h3>
          </li>
          <li id='li_navigations'>
            <button className='btns_navigations' onClick={firstInputs}>Product</button><button className='btns_navigations' onClick={secondInputs}>Varieties</button>
          </li>
          <li>
            <nav id='firstnav'>
            <li className='inputs_info_nav first_nav'>
                <input type='text' id='product_name' value={prname} onChange={(e) => {setprname(e.target.value)}} name='product_name' placeholder='Product Name' />
              </li>
              <li className='inputs_info_nav'>
                <textarea id='product_desc' name='product_desc' value={prdesc} onChange={(e) => {setprdesc(e.target.value)}} placeholder='Product Description' ></textarea>
              </li>
              <li className='inputs_info_nav'>
                <select id='category' onChange={(e) => {setprcat(e.target.value)}}>
                  <option default>Select Category of Product</option>
                  <option value='Shirt'>Shirt</option>
                  <option value='Cosmetics'>Cosmetics</option>
                  <option value='FootWear'>Foot Wear</option>
                </select>
              </li>
              <li className='inputs_info_nav'>
                <input type='text' value={prbrand} onChange={(e) => {setprbrand(e.target.value)}} id='brand' placeholder='Brand Name' />
              </li>
              <li className='inputs_info_nav'>
                <input type='file' id='img_selector' name='img_selector' multiple placeholder='Select Image' onChange={(e) => {/*fileGetter()*/ setimgfile(e.target.files[0])}} />
              </li>
            </nav>
            <nav id='secondnav'>
              <li className='inputs_info_nav'>
                <button onClick={secondNav} className='btns_adds' disabled={btnstatustype}>Add Type</button><button onClick={createSizes} className='btns_adds' disabled={btnstatus}>Add Sizes</button>
              </li>
              <li id='second_li_inputs'>
                <nav id='nav_appends'>
                    {/** Append Child Here */}
                </nav>
              </li>
              <li className='inputs_info_nav'>
                <button disabled={numbersizes > 0 && numbertypes > 0? false : true} onClick={fileProceeder}>Post Product</button>
              </li>
            </nav>
          </li>
        </nav>
      </motion.div>

      <nav id='nav_products'>
        <li id='add_li'>
          <motion.button
          whileHover={{
            scale: 1.1
          }}
          id='add_btn' onClick={() => {initiateProd()}}>{inputsprod? "Add Product" : "Cancel"}</motion.button>
        </li>
      </nav>
      <div id='div_content_products'>
        <ul
        style={{
          filter: blur? "blur(5px)" : "blur(0px)"
        }} 
        id='ul_content_products'>
          {proDs.map((items) => {
            return(
              <Link className='link_products' key={items.product_id} to={`/dashboard/shopadmin/${items.product_id}`} >
                <li
                className='under_li' key={items.product_id}>
                  <nav
                  className='nav_products'>
                    <li>
                      <img src={items.base_preview} className='imgs_handler' alt={items.product_id}/>
                    </li>
                    <li className='above_li'>
                      <p><b>{items.prname} | {items.product_id}</b></p>
                    </li>
                    <li className='above_li'>
                      <p><b>&#8369;{items.minPrice} - &#8369;{items.maxPrice}</b></p>
                    </li>
                    <li className='above_li'>
                      <p>{items.prbrand}</p>
                    </li>
                    <li className='above_li'>
                      <p>{items.prcat}</p>
                    </li>
                    <li className='above_li'>
                      <p>{items.date_posted}</p>
                    </li>
                  </nav>
                </li>
              </Link>
              )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ProductsDashboard