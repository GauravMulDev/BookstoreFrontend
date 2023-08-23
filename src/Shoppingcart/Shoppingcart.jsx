import React from "react";

import {
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  Divider
} from "@mui/material";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import { groupedItemsAtom } from "../Store/store.js";
const ShoppingCart = ({ cartItems, onRemoveFromCart }) => {
  const navigate = useNavigate();


  const [groupedItems, setGroupedItems] = useAtom(groupedItemsAtom);

  React.useEffect(() => {
    const newGroupedItems = cartItems.reduce((acc, item) => {
      const foundItem = acc.find(i => i.title === item.title);
      if (foundItem) {
        foundItem.quantity += item.quantity;
        foundItem.total += item.price * item.quantity;
      } else {
        acc.push({
          ...item,
          total: item.price * item.quantity
        });
      }
      return acc;
    }, []);

    setGroupedItems(newGroupedItems);
  }, [cartItems, setGroupedItems]);
  const totalPrice = cartItems.reduce(
    (accum, item) => accum + item.price * item.quantity,
    0
  );


  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Paper style={{ margin: "2rem 1rem 1rem 1rem", padding: "1rem" }}>
      {totalPrice === 0 ? (
        <Typography variant="h5" color="textSecondary" align="center">
          Your cart is empty, please add items
        </Typography>
      ) : (
        <div>
          <Table>
            <TableBody>
              {cartItems.map(item => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Avatar
                      src={item.image}
                      alt={item.title}
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      Price: ${item.price}
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Total: ${item.total}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<RemoveShoppingCartRoundedIcon />}
                      onClick={() => onRemoveFromCart(item)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider style={{ margin: "1rem 0" }} />
          <Typography variant="h6" align="right">
            Grand Total: ${totalPrice.toFixed(2)}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "1rem"
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              size="large"
            >
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={totalPrice === 0}
              size="large"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default ShoppingCart;
