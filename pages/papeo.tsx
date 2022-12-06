import { Dispatch, SetStateAction } from 'react'
import { PapeoType } from './api/utils'
export default function Papeo({papeo, setQuery}: {papeo: PapeoType, setQuery: Dispatch<SetStateAction<string>>}) {
  if (!papeo) {
    return <div>Error</div>
  }
  return (
    <div>
      <div style={{fontWeight: 500, fontSize: '14px', lineHeight: '18px', color: '#1857b6', marginBottom: '2px'}}>
        <a href={`https://www.semanticscholar.org/reader/${papeo.sha1}?experiments=&features=reader_skimming%3Atrue`} target='_blank' rel="noreferrer">{papeo.title}</a>
      </div>
      <div style={{fontWeight: 300, fontSize: '12px', color: '#536479', marginBottom: '4px'}}>
        <span>{papeo.authors.map((author, idx) => {
          return <span key={author}><a href='#' style={{color: '#1857b6'}} onClick={(event) => {
          event.preventDefault()
          setQuery(author)
        }}>{author}</a>{idx == papeo.authors.length - 1 ? '' : ', '}</span>
        })}</span>
      </div>
      <div style={{fontWeight: 400, fontSize: '12px', display: 'flex', justifyContent: 'space-between', margin: '8px 0'}}>
        <a href='#' style={{color: '#1857b6'}} onClick={(event) => {
          event.preventDefault()
          setQuery(papeo.track)
        }}>{papeo.track}</a>
        <div>
          {papeo.status} / {papeo.type}
        </div>
      </div>
      <div style={{fontWeight: 400, fontSize: '12px', color: '#1857b6', display: 'flex'}}>
      </div>
      <div style={{fontWeight: 400, fontSize: '12px', color: '#1857b6', display: 'flex'}}>
        <div style={{display: 'flex', height: '32px', padding: '0px 10px', justifyContent: 'center', alignItems: 'center', border: '1px solid #bbb', borderRadius: '6px'}}>
          <span style={{marginRight: '4px'}}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 0C5.86207 0 6.72414 0.258621 7.5 0.689655C8.27586 1.12069 8.87931 1.72414 9.31034 2.5C9.74138 3.27586 10 4.13793 10 5C10 5.86207 9.74138 6.72414 9.31034 7.5C8.87931 8.27586 8.27586 8.87931 7.5 9.31034C6.72414 9.74138 5.86207 10 5 10C4.13793 10 3.27586 9.74138 2.5 9.31034C1.72414 8.87931 1.12069 8.27586 0.689655 7.5C0.258621 6.72414 0 5.94828 0 5C0 4.05172 0.258621 3.27586 0.689655 2.5C1.12069 1.72414 1.72414 1.12069 2.5 0.689655C3.27586 0.258621 4.13793 0 5 0ZM7.32759 5.51724C7.5 5.43103 7.58621 5.25862 7.58621 5.08621C7.58621 4.91379 7.5 4.74138 7.32759 4.65517L3.7931 2.5C3.62069 2.41379 3.44828 2.41379 3.27586 2.5C3.10345 2.58621 3.10345 2.75862 3.10345 2.93103V7.15517C3.10345 7.32759 3.18966 7.5 3.36207 7.58621C3.53448 7.67241 3.7069 7.67241 3.87931 7.58621L7.32759 5.51724Z" fill="#536479"/>
            </svg>
          </span>
          <a href={papeo.reader} target='_blank' rel='noopener noreferrer'>Open PDF</a>
        </div>

        {papeo.arr && papeo.arr.length > 0 && (
          <div style={{ display: 'flex', marginLeft: '12px', height: '32px', padding: '0px 10px', justifyContent: 'center', alignItems: 'center', border: '1px solid #bbb', borderRadius: '6px' }}>
            <a href={papeo.arr} target='_blank' rel='noopener noreferrer'>Open ARR</a>
          </div>
        )}

      </div>
    </div>
  )
}
