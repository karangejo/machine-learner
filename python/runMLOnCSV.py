import pandas as pd
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import ModelCheckpoint
import sys

def ML(file_name,Xarr,Yarr):
    print(Xarr)
    print(Yarr)
    df = pd.read_csv(file_name)
    print(df.head())
    X = df[Xarr].values
    Y = df[Yarr].values
    print(X.shape)
    print(Y.shape)
    min_max_scaler = preprocessing.MinMaxScaler()
    X_scale = min_max_scaler.fit_transform(X)
    X_train, X_val_and_test, Y_train, Y_val_and_test = train_test_split(X_scale, Y, test_size=0.3)
    X_val, X_test, Y_val, Y_test = train_test_split(X_val_and_test, Y_val_and_test, test_size=0.5)
    print(X_train.shape, X_val.shape, X_test.shape, Y_train.shape, Y_val.shape, Y_test.shape)
    model = Sequential([ Dense(32, activation='relu', input_shape=(len(Xarr),)), Dense((len(Xarr*2)), activation='relu'), Dense(len(Yarr), activation='sigmoid'),])
    model.compile(optimizer='adam', loss='mean_squared_error',)
    checkpoint = ModelCheckpoint('model.h5', verbose=1, monitor='val_loss',save_best_only=True, mode='auto')
    hist = model.fit(X_train, Y_train, batch_size=32, epochs=100, validation_data=(X_val, Y_val), callbacks=[checkpoint])
    print(hist)
    print(model.evaluate(X_test, Y_test))

file = sys.argv[1]
x = sys.argv[2].split(',')
y = sys.argv[3].split(',')
ML(file,x,y)
sys.stdout.flush() # sends data back to node
