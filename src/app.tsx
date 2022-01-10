import { ThemeProvider } from '@mui/material/styles'
import { useDrag } from '@use-gesture/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { h } from 'preact'
import { FlexRow } from './Components/Minis'
import { ActiveTasksQuery, CompletedTasksQuery } from './Data/data'
import { useDarkMode } from './Utils/react-utils'

// eslint-disable-next-line @typescript-eslint/promise-function-async
// const App = lazy(() => import('./app'))
// <Suspense fallback={<div>Loading...</div>}></Suspense>
const DragDiv = ({ id }) => {
  const bind = useDrag(({ direction, touches, last, swipe: [swipeX, swipeY], distance: [mx, my] }) => {
    console.log(id, direction, touches, mx, my)
    const dir = swipeX === -1
      ? 'l'
      : swipeX === 1
        ? 'r'
        : swipeY === -1
          ? 'u'
          : swipeY === 1 ? 'd' : null
    last && console.log('last', id, dir)
  })
  return (
    <div {...{ id }} {...bind()} className="w-64 h-64 border border-gray-500 touch-none" style={{ touchAction: 'none' }}>
      {id}
    </div>
  )
}
export const App = () => {
  // InitializingServiceWorker()
  const ActiveTasks = useLiveQuery(ActiveTasksQuery) ?? []
  const CompletedTasks = useLiveQuery(CompletedTasksQuery) ?? []

  const theme = useDarkMode()

  // useEffect(() => {
  //   localStorage.setItem('ActiveTasks', JSON.stringify(ActiveTasks))
  // }, [ActiveTasks])

  // useEffect(() => {
  //   localStorage.setItem('CompletedTasks', JSON.stringify(CompletedTasks))
  // }, [CompletedTasks])

  console.log(`Active Tasks: ${ActiveTasks.length}`)
  console.log(`Completed Tasks: ${CompletedTasks.length}`)

  return (
    <ThemeProvider theme={theme}>
      <FlexRow className="p-4 touch-none">
        <DragDiv id="one" />
        <DragDiv id="two" />
      </FlexRow>

    </ThemeProvider>
  )
}
