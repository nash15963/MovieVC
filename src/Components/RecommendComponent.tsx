import React, { useCallback, useState  } from "react";
import { useTransition, animated ,config } from '@react-spring/web'
import { useNavigate } from "react-router-dom";
import { randomMovie } from '../Interfaces/MovieInterfaces';
import { BiChevronRight } from 'react-icons/bi';



const RecommendComponent = ({dataObj}:{dataObj:randomMovie[]}) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const onClick = useCallback(() => setIndex(state => (state + 1)% 20), []); // when the number arrives 20 it turns back 0



  const transitions = useTransition(index,{ //controll index
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)'  },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    config: config.slow
  });
  //react-spring hooks control animation
  // console.log(transitions)

  return(
    <div className="random">
      {dataObj.length>0 
      ? transitions((style, i) => {
        const Page = dataObj[i]
        return (
            <animated.div style={style} className="random-frame" onClick={onClick}>           
            
            <img  loading="lazy" src={Page.backdrop_path} alt={Page.original_title} />

            <div className='random-mes'>
                <p className='random-recommend'>we recommend you :</p>
                <h2>{Page.title}</h2>
                <p>{Page.original_title}</p>
                <span onClick={()=>{
                    navigate(`/watchs/${Page.id}`);
                }}>see more ....</span>
            </div>
            <div className="random-icon"><BiChevronRight className="icon"/></div>
            </animated.div>
  )})
      : ''
      }

    </div>
  )

  
}

export default RecommendComponent

// prettier code
// css

// doc : https://www.react-spring.dev/docs/components/use-transition#typescript
// https://codesandbox.io/s/cisbc?file=/src/index.css