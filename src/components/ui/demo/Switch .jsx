import { Switch } from '@/components/ui/switch';
import { changeMode } from '@/store/slices/mode';
import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

export function SwitchDemo() {
  const dispatch = useDispatch();
  const modeState = useSelector((state) => state.mode.mode);
 const changeModeBtn = () => {
   dispatch(changeMode(modeState == 'light' ? 'dark' : 'light'));
 };
  return (
    <div className='flex items-center space-x-2'>
      <MdLightMode />
      <button onClick={()=>{changeModeBtn()}}>
      <Switch id='airplane-mode' />
      </button>
      <MdDarkMode />
    </div>
  );
}
