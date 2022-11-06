import {useState, useCallback} from 'react'

export default function ExpandableText({text, length=205}: {text: string, length?: number}) {
  const [expand, setExpand] = useState(false);
  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setExpand(e => !e)
  }, [])
  if ((text??'').length <= length) {
    return <span>{text}</span>
  }
  return (
    <span>
      {expand ? text : `${text.slice(0, length).trim()}... `}
      <a href='#' onClick={handleClick} style={{color: '#1857b6'}}>
        {expand ? '  Collapse' : 'Expand'}
      </a>
    </span>
  )
}
