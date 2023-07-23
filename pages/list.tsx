import { SetStateAction, useEffect, useState } from "react";
import { NextPage } from 'next'
import { Text, Flex, Box, Button, TableRow, TableCell, FormatCryptoCurrency } from 'components/primitives';
import {
  contractTypeToDisplayNameMapping as nameMapping,
  contractTypeToImageMapping as imageMapping,
} from "../const/contractToDisplayMappings";
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { ChainId, ThirdwebProvider , useContract , ConnectWallet, useAddress, useSDK, useSigner, ThirdwebSDK, ContractType} from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
import Link from "next/link";
import Img from "components/primitives/Img";
import { OpenSeaVerified } from "components/common/OpenSeaVerified";
// import { Signer } from "ethers";
const activeChain = "mumbai"; 
const IndexPage: NextPage = () => {
const [myArray, setMyArray] = useState([]);
   
       const [name, setName] = useState("");
  const [myCar, setMyCar] = useState("nft-collection");
  const [symbol, setSymbol] = useState("");
  const [recipient, setRecipient] = useState("");
  const [percent, setPercent] = useState(0);
    const [existingContracts, setExistingContracts] = useState<
    {
      address: string;
      contractType: ContractType;
    }[]
  >([]);
  
    /////////////////////////////////////start////////////
    // const router = useRouter();
 
    // Function to deploy the proxy contract
 
// Get the signer of the currently connected wallet
const signer = useSigner();
// console.log('address',signer);
// // Instantiate the SDK with the signer
const thirdweb = new ThirdwebSDK('mumbai');
 const { address } = useAccount();
 console.log('address',address);
  const sdk = useSDK();

// // Fetch the contracts for this address and set them in state using the SDK
thirdweb.getContractList(address).then((contracts) => {
  // set the contracts in state
  // console.log('contracts',contracts);
  setExistingContracts(contracts);
});

    // platform_fee_recipient: recipient,
    //     platform_fee_basis_points: num,

//   const contract = async () => {
//    let contracts = await sdk?.getContractList(address)
//  console.log(contracts);
// setExistingContracts(contracts);
//     contracts && contracts.map(async (contract) => {
//       let contractType = await contract.contractType();
//     //   console.log(contract.address)
//     //   console.log(contractType);
//     //    setExistingContracts(contract);
      
//     })
//   }

  // if(address){
  //  contract();  

  //  console.log('existingContracts',existingContracts)
   

  // }
  
 



    

const handleSubmit = async (event: { preventDefault: () => void; }) => {
  
    if (!address || !sdk) {
        alert(`address: ${address}`);
      return;
    }


    //name , symbol type
    event.preventDefault();
    console.log(myCar);
    console.log(name);
    console.log(symbol);
    console.log(recipient);
    console.log(percent);
    let num = Number(percent);
     const contractAddress = await sdk.deployer.deployBuiltInContract(
      myCar,
      {
        name: name,
        symbol: symbol,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: recipient,

        recipients: [
          {
            address:address,
            sharesBps: 100
          },
        ],
      }
    );

    // This is the contract address of the contract you just deployed
    console.log(contractAddress);
      alert(contractAddress);
    // alert(`Succesfully deployed ${contractSelected} at ${contractAddress}`);
    
    // alert(`The name you entered was: ${name}`);
  }


  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMyCar(event.target.value)
  }



const desktopTemplateColumns = '1.5fr 1.7fr repeat(3, 0.6fr)'

  return (
     
         
    <Layout>
      <Flex
        direction="column"
        align="center"
        css={{ py: '200px', px: '$3', textAlign: 'center' }}
      >
        {/* <Box css={{ color: '$gray11', mb: '30px' }}>
          <FontAwesomeIcon icon={faFolderOpen} size="2xl" />
        </Box> */}
        {/* <ConnectWallet/> */}
        {/* <Text style="body1" color="subtle" css={{ mb: '$1' }}>
          test 404 Error.
        </Text> */}
      
        {/* ////////////////////////// */}

          {/* {  existingContracts.map(async (contract) => {
      let contractType = await contract.contractType();
      console.log(contract.address)
      console.log(contractType);
    })
} */}
<Text className="textsize">
    Your contracts
</Text>
<Text className="textsssl">The list of contract instances that you have deployed or imported with thirdweb .

</Text>
<Flex className="jusmainss">

 <Link css={{
                  minWidth: 100,
                  justifyContent: 'center',
                }} href="/test" >
              <Button className="successbtn" css={{
                  minWidth: 100,
                  justifyContent: 'center',
                  background:'#009cff',
                }}>Deploy a Contract</Button>
            </Link>
</Flex>

<table id="tablacss">
    <thead>

    <th>Network</th>
    <th>CONTRACT ADDRESS</th>

    

</thead>
<tbody>


{existingContracts && existingContracts.map(( listValue, index ) => {
  console.log(listValue);
//    let contractType = listValue.contractType();
          return (
            <tr key={index}>
  
              <td >{listValue.chainId}</td>
              {/* <td onClick={() => {navigator.clipboard.writeText(listValue.address)}}
> 
<Text className="svgcss">
 <svg fill="#9b9797" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Text-files"> <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"></path> <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"></path> <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"></path> <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"></path> <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"></path> </g> </g></svg>
{listValue.address.slice(0, 6) + "..." + listValue.address.slice(-4)}
</Text>
</td> */}
<td className="link">
    <Link href={"mint?contract=" + listValue.address } >{listValue.address.slice(0, 6) + "..." + listValue.address.slice(-4)}</Link></td>
              {/* <td><Button css={{
                  minWidth: 100,
                  justifyContent: 'center',
                }} >Mint </Button></td>
             */}</tr>
          );
        })}
</tbody>
</table>





      
      </Flex>
    </Layout>

  )
}

export default IndexPage