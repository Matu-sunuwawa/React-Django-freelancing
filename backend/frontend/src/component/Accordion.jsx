import { useState } from 'react'

const Accordion = ({title,content}) => {

    const [isActive, setIsActive] = useState(false)

  return (
    <div className='rounded-sm'>
        <div className='flex justify-between py-2 px-4 rounded-sm bg-neutral-300 hover:bg-neutral-200' onClick={() => setIsActive(!isActive)}>
            <div>{title}</div>
            <button>{isActive? '-':'+'}</button>
        </div>
        <div className='text-left px-4 py-2 justify-between bg-neutral-300'>
            {isActive? <div>{content}</div>:null}
        </div>
    </div>
  )
}

export default Accordion
