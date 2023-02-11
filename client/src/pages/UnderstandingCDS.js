//image
import CDSBackground from '../assets/img/CDSpage_bg.jpg';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

// css
import '../assets/css/understandingCDS.css';

function UnderstandingCDS() {
  return (
    <>
      <img
        src={CDSBackground}
        alt=" infoSlide1"
        className="w-[100%] h-[100%] object-fill"
      ></img>
      <div className="flex justify-center font-bold text-3xl my-[1rem] mt-[15rem]">
        What is a Credit Default Swap (CDS)?
      </div>
      <div className="w-[60%] mx-auto mb-[8rem]">
        <div className="cdsText flex justify-center text-center font-semibold bg-moreDarkGrayColor p-[2rem] rounded-2xl">
          Credit default swap (CDS) is credit derivatives, which is conditional
          contracts in which credit protection buyers receive compensation under
          the agreement from credit protection seller when credit event happened
          instead of paying CDS premium. Typically, CDS is traded between
          financial firms such as banks, insurance company, hedge funds, etc.
          The CDS buyer will pay Premium for the period specified in the
          contract. Instead, if buyer’s underlying asset faces a default
          situation before the contract expires, buyer can receive compensation
          from the CDS seller. Conversely, if the underlying asset does not face
          a default situation until the contract expires, the CDS seller
          receives a premium payment from the CDS buyer and the contract is
          terminated. Thinking about the 2008 subprime mortgage crisis makes you
          more understanding. In 2005, Dr. Michael Bury thought that U.S.
          housing market bonds were about to collapse, and went to big
          investment banks such as Goldman Sachs, Deutsche Bank, and Bear
          Stearns to issue CDS with CDO as underlying assets. He pays premium
          every fixed period and draws astronomical sums from investment banks
          when the U.S. housing market collapses in 2008. In conclusion, CDS is
          a financial derivative that can eliminate or systematically mitigate
          asset from risks such as credit risk, liquidity risk, interest rate
          risk, foreign exchange risk, and investment risk.
        </div>
      </div>
      <div className="flex justify-center font-bold text-3xl my-[1rem]">
        Problems with CDS
      </div>
      <div className="flex justify-center text-xl text-grayForText mb-[1rem]">
        What inconveniences do CDS contractors feel?
      </div>
      <div className="w-[60%] mx-auto">
        <div className="cdsText flex justify-center text-center font-semibold bg-moreDarkGrayColor p-[2rem] rounded-2xl">
          In the event of a credit event, CDS seller calculates the recovery
          value of the underlying asset and pays the CDS buyer the difference
          from the guarantee amount in the contract. However, financial
          derivatives have a complicated relationship between sellers and
          buyers. Also, the process of assessing the recovery value of an
          underlying asset takes a lot of time, so even if the CDS buyer is in a
          position to receive compensation in the event of a credit event, it is
          not known how many years the actual compensation will take.
        </div>
      </div>
      <div className="flex justify-center text-xl text-grayForText mb-[1rem] my-[4rem]">
        What constraints exist to create a CDS contract?
      </div>
      <div className="w-[60%] mx-auto">
        <div className="cdsText flex justify-center text-center font-semibold bg-moreDarkGrayColor p-[2rem] rounded-2xl">
          ISDA Master Agreement provides standardized regulations and conditions
          for derivatives transactions such as CDS. Although the terms and
          conditions of the ISDA do not specify capital requirements for CDS
          contracts, they must meet a certain level of capital requirements to
          deal with investment and commercial banks that can provide sufficient
          and safe payment guarantees. These constraints vary across industrial
          and financial institutions and make it difficult for individuals to
          prepare the capital they need. So if you're an individual investor,
          not an institution, there are hurdles where you can't participate in
          the CDS market even if you have a brilliant investment idea.
        </div>
      </div>
      <div className="flex justify-center text-xl text-grayForText mb-[1rem] my-[4rem]">
        What risk does the CDS buyer take?
      </div>
      <div className="w-[60%] mx-auto">
        <div className="cdsText flex justify-center text-center font-semibold bg-moreDarkGrayColor p-[2rem] rounded-2xl">
          Prior to the 2008 financial crisis, AIG sold CDS in bulk as a seller.
          Of course, Default events, like the collapse of the housing market in
          the United States, were like Black Swan. Nevertheless, AIG failed to
          manage their risk as a CDS payment guarantor and applied for a bailout
          from the government. As such, CDS buyers may fall into a situation
          where the payment guarantor faces a default situation and cannot
          receive a deposit even if a credit event occurs.
        </div>
      </div>
      <div className="flex justify-center font-bold text-3xl my-[1rem] mt-[15rem]">
        Blockchain Solution
      </div>
      <div className="w-[60%] mx-auto">
        <div className="cdsText flex justify-center text-center font-semibold bg-moreDarkGrayColor p-[2rem] rounded-2xl">
          If a CDS contract can be written on a blockchain that allows the value
          of data to move, the parties to the CDS contract can complete the CDS
          transaction without having to go through complicated procedures and
          legal disputes.
        </div>
      </div>
      <div className="w-[60%] mx-auto mt">
        <div className="cdsText flex justify-center text-center font-semibold bg-moreDarkGrayColor p-[2rem] rounded-2xl my-[3rem]">
          Blockchain networks and smart controls enable conditional peer-to-peer
          transactions, making it easier for individuals to participate in the
          capital market. Individual investors can easily realize their
          brilliant investment ideas.
        </div>
      </div>
      <div className="w-[60%] mx-auto mt">
        <div className="cdsText flex justify-center text-center font-semibold bg-moreDarkGrayColor p-[2rem] rounded-2xl my-[3rem]">
          CDS reserves generated on top of the smart contact are transparently
          disclosed on top of the blockchain distributed ledger system, allowing
          CDS contractors to escape moral hazard.
        </div>
      </div>
      <div className="fixed bottom-11 right-11">
        <ScrollButton />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default UnderstandingCDS;
