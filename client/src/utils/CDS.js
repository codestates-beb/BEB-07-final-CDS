// modules 
import Web3 from "web3";

// Contract Data
import CDScontractABI from "../assets/contract/CDS.json";

// create CDS contract instnace by contract address deployed in blockchain
// 배포된 주소를 인자로 사용하여 web3 컨트랙트 객체를 생성하는 함수입니다.
export default function CDS(_addr) {
    class Contract {
        constructor(_addr) {
            if( !window.ethereum ) {
                console.log( new Error("Not installed Wallet!"));
                return;
            }

            if(_addr){
                this.addr = _addr;
                const provider = new Web3(window.ethereum);
                this.contract = new provider.eth.Contract(CDScontractABI.abi, _addr);
            }
        }

        setAddr (_addr) {
            if( !window.ethereum ) {
                console.log( new Error("Not installed Wallet!"));
                return;
            }

            this.addr = _addr;
            const provider = new Web3(window.ethereum);
            this.contract = new provider.eth.Contract(CDScontractABI.abi, _addr);
        }
    }

    return new Contract(_addr);
}