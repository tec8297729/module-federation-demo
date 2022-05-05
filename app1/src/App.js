/*
 * @Author: zqzhan
 * @Date: 2022-05-05 22:49:15
 * @LastEditors: zqzhan
 * @LastEditTime: 2022-05-05 23:29:25
 * @Description: 
 */
import React, {useState} from 'react';
import BtnEs from 'app2/BtnEs';
import BtnPm from 'app2/BtnPm';
import styles from './app.less';

const App = () => {
  const [title, setTitle] = useState('hello mf')
  return (
    <div className={styles.boxWrap}>
      <div>{title}</div>

      <BtnEs live={{
        title:'学习',
        room: 3333,
        uid: 'xxxx',
        name: 'app1传入'
      }} />
      <BtnPm setTitle={setTitle} />
    </div>
  );
};

export default App;
