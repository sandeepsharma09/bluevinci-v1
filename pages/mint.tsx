import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { SetStateAction, useEffect, useState } from "react";
import * as React from "react";
import { ConnectWallet, useAddress, useSDK , useContract , useContractRead,useContractWrite  } from "@thirdweb-dev/react";
// import "./styles/Home.css";

const IndexPage: NextPage = () => {
   const [name, setName] = useState('');
   React.useEffect(() => {
    // window is accessible here.
    const search = window.location.search;
const params = new URLSearchParams(search);
const foo = params.get('contract');
console.log(foo);
setName(foo);
  }, []);
     




  
  const [myCar, setMyCar] = useState("nft-collection");
  const [symbol, setSymbol] = useState("");
  const [recipient, setRecipient] = useState("");
  const [percent, setPercent] = useState('');
  const [newmain, setNewmain] = useState(0);
    /////////////////////////////////////start////////////
    // const router = useRouter();
  const address = useAddress();
  const sdk = useSDK();
// "0x22bf39DB3AddE6DB848B20BEE9798009Da03820E"
    const { contract } = useContract(name);

console.log('contract', contract);

// =======================

  const { mutateAsync: mintTo, isLoading } = useContractWrite(contract, "mintTo")

  const call = async () => {
    try {
      const data = await mintTo({ args: [recipient, percent] });
      console.info("contract call successs", data);
      alert('success');
    } catch (err) {
      console.error("contract call failure", err);
      alert('error');
    }
  }




/////////////////////////////

const handleSubmit = async (event: { preventDefault: () => void }) => {
    //name , symbol type
    event.preventDefault();
    console.log(myCar);
    console.log(name);
    console.log(symbol);
    console.log(recipient);
    console.log(percent);
    
    // let num = Number(percent) * 100;
    // num = Number(num);
    //  console.log('number',num);
   
      console.log('newmain',newmain);
   
call();
console.log('working');






  }


  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setMyCar(event.target.value)
  }

  const handleChange1 = () => {
    console.log('newmoon');
    // setNewmain(percent*100);
  }

/////////////////////////////



  return (
    <Layout>
      <Flex
        direction="column"
        align="center"
        css={{ py: '200px', px: '$3', textAlign: 'center' }}
      >
        
      <form onSubmit={handleSubmit}>
                {/* <label className="d-none">Contract Type: &nbsp;
        <select  onChange={handleChange} className="form-control">
        <option value="nft-collection">721 </option>
        <option value="edition">1155</option>
      </select> 
      </label> */}
      <br></br>
      <br></br>
   
      {/* <label>Contract  name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label> */}
      <br></br>
      <br></br>

       {/* <label className="d-none">Enter  Symbol:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </label> */}
      {/* <br></br>
      <br></br> */}
      <label>Enter  address:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
      <label>Enter  url:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={percent}
           onChange={e => { setPercent(e.target.value) }}

        />
      </label>
      <br></br>
      <br></br>
      <br></br>
  

      {/* <input onClick={handleChange1} type="submit" value={'Deploy'}  /> */}
        <Button onClick={handleChange1} type="submit"
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                Mint Now
              </Button>
    </form>
      </Flex>
    </Layout>
  )
}

export default IndexPage
