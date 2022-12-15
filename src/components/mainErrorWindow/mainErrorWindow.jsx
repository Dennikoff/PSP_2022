import React from 'react';
import classes from './mainErrorWindow.module.css'
const MainErrorWindow = () => {
    return (
        <div className={classes.mainError}>
            <div className={classes.mainContainer}>
                <div className={classes.header}>
                    Сервер временно недоступен
                </div>
                <div className={classes.body}>
                    Мы уже знаем о проблеме и пытаемся её решить
                </div>
            </div>
        </div>
    );
};

export default MainErrorWindow;