// import React from "react";
// import CountUp from "react-countup";
// import "../../assests/CSS/HomeCircle.css";

// const HomeCircles = () => {
//   return (
//     <section className=" ccircles">
//       <div className="circle">
//         <CountUp
//           start={0}
//           end={500}
//           delay={0}
//           enableScrollSpy={true}
//           scrollSpyDelay={500}
//         >
//           {({ countUpRef }) => (
//             <div className="counter">
//               <span ref={countUpRef} />+
//             </div>
//           )}
//         </CountUp>
//         <span className="circle-name">
//           Satisfied
//           <br />
//           Patients
//         </span>
//       </div>
//       <div className="circle">
//         <CountUp
//           start={0}
//           end={80}
//           delay={0}
//           enableScrollSpy={true}
//           scrollSpyDelay={500}
//         >
//           {({ countUpRef }) => (
//             <div className="counter">
//               <span ref={countUpRef} />+
//             </div>
//           )}
//         </CountUp>
//         <span className="circle-name">
//           Verified
//           <br />
//           Doctors
//         </span>
//       </div>
//       <div className="circle">
//         <CountUp
//           start={0}
//           end={35}
//           delay={0}
//           enableScrollSpy={true}
//           scrollSpyDelay={500}
//         >
//           {({ countUpRef }) => (
//             <div className="counter">
//               <span ref={countUpRef} />+
//             </div>
//           )}
//         </CountUp>
//         <span className="circle-name">
//           Specialist
//           <br />
//           Doctors
//         </span>
//       </div>
//     </section>
//   );
// };



import React from "react";
import CountUp from "react-countup";
import "../../assests/CSS/HomeCircle.css";

const HomeCircles = () => {
  return (
    <section className="ccircles">
      <div className="circle">
        <CountUp
          start={0}
          end={500}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          Satisfied
          <br />
          Patients
        </span>
      </div>
      <div className="circle">
        <CountUp
          start={0}
          end={80}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          Verified
          <br />
          Doctors
        </span>
      </div>
      <div className="circle">
        <CountUp
          start={0}
          end={35}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          Specialist
          <br />
          Doctors
        </span>
      </div>
    </section>
  );
};

export default HomeCircles;


// export default HomeCircles;
