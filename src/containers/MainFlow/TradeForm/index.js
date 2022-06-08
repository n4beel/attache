import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { getStorageItem } from '../../../utils';
import TradeFormView from './view';
import { tradeCoin } from '../../../store/actions/authActions'

const TradeForm = (props) => {

  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState("")
  const [quantityError, setQuantityError] = useState({
    error: false,
    message: ""
  })
  const [pair, setPair] = useState("")
  const [pairError, setPairError] = useState({
    error: false,
    message: ""
  })
  const [price, setPrice] = useState("")
  const [priceError, setPriceError] = useState({
    error: false,
    message: ""
  })
  const [email, setEmail] = useState("")

  useEffect(() => {
    (async () => {
      const email = await getStorageItem("Email")
      setEmail(email);
    })()

    // props.navigation.addListener('focus', () => {
    //   console.log("focus -->", props.route.params.pair)
    // })
    // props.navigation.addListener('blur', () => {
    //   props.navigation.setParams({ pair: null })
    //   console.log("in blur -->", props.route.params)

    // })

    // props.navigation.addListener('focus', () => {
    //   console.log("focus -->", props.route.params.pair)
    //   if (props.route.params.pair) {
    //     console.log("pair present")
    //   }
    //   else {
    //     console.log("pair not present")

    //   }
    // })
    // props.navigation.addListener('blur', () => {
    //   props.navigation.setParams({ pair: null })
    //   console.log("blur -->", props.route.params.pair)
    // })
  }, [])

  const onChange = (data) => {
    const { text, name } = data;
    if (name.toLowerCase() === 'quantity') {
      setQuantity(text);
    }
    if (name.toLowerCase() === 'price') {
      setPrice(text);
    }
    if (name.toLowerCase() === 'pair') {
      setPair(text);
    }
  };

  const onBlur = (name) => {
    console.log('name in blur');
    if (name.toLowerCase() === 'quantity') {
      if (quantity === "") {
        setQuantityError({ error: true, message: 'Quantity cannot be empty.' });
      } else if (quantity !== "" && isNaN(parseFloat(quantity))) {
        setQuantityError({ error: true, message: 'Please enter a valid quantity.' });
      }
      else {
        setQuantityError({ error: false, message: '' });
      }
    }
    if (name.toLowerCase() === 'price') {
      if (price !== "" && isNaN(parseFloat(price))) {
        setPriceError({ error: true, message: 'Please enter a valid price.' });
      }
      else {
        setPriceError({ error: false, message: '' });
      }
    }
    if (name.toLowerCase() === 'pair') {
      if (pair === "") {
        setPairError({ error: true, message: 'Pair cannot be empty.' });
      }
      else {
        setPriceError({ error: false, message: '' });
      }
    }
  };

  const onSubmit = (action) => {
    try {
      if (quantity.trim() && !quantityError.error && pair.trim() && !pairError.error && !priceError.error) {
        console.log("loading", loading)
        setLoading(true);

        let tradeData = {
          user: email,
          pair
        }

        if (action === "buy") {
          tradeData.qty = quantity
        } else if (action === "sell")
          tradeData.qty = (quantity * -1).toString()

        if (price !== "") {
          tradeData.price = parseFloat(price)
        }

        console.log("trade data -->", tradeData);

        tradeCoin(
          tradeData,
          (res) => {
            console.log('res of FORGET -->', res);
            props.showAlert("Trade Added");
            props.navigation.goBack()
            setPrice("");
            setQuantity("");
            setPair("")
            setLoading(false);
          },
          (err) => {
            props.showAlert(err.err || err);
            console.log('err of Forget -->', err);
            setLoading(false);
          },
        );

      } else {
        props.showAlert('Please fill all fields');
      }
    } catch (e) {
      console.log('e in forget -->', e);
      setLoading(false);
    }
  };

  const onClose = () => {
    setPrice("");
    setQuantity("");
    setPair("");
    props.navigation.goBack();

  }

  const viewProps = {
    ...props,
    quantity,
    quantityError,
    price,
    priceError,
    pair,
    pairError,
    loading,
    onChange,
    onBlur,
    onSubmit,
    onClose
  };

  return <TradeFormView {...viewProps} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: (message) => dispatch(onSnackbar(message)),
  };
};

export default connect(null, mapDispatchToProps)(TradeForm);
