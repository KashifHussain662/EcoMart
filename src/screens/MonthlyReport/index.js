import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {COLORS} from '../../theme';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const MonthlyReport = ({route}) => {
  const {monthlyItems, previousBill, currentBill, shopName, customerName} =
    route.params;

  const totalBill = monthlyItems.reduce((sum, item) => sum + item.price, 0);
  const overallTotal = previousBill + currentBill + totalBill;

  const data = [
    ...monthlyItems,
    {isSummary: true, totalBill, previousBill, currentBill, overallTotal},
  ];

  const generatePDF = async () => {
    const html = `
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="width: 80%; margin: 20px auto; background-color: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 8px;">
          <!-- Header Section -->
          <div style="background-color: #000; text-align: center; color: #fff; border-radius: 8px; margin-bottom: 20px;">
            <img src="https://yourdomain.com/path/to/store-logo.png" alt="Store Logo" style="max-height: 180px" />
          </div>

          <!-- Info Section (Customer and Date) -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <h4 style="margin: 0; font-size: 16px">Customer: ${customerName}</h4>
            <h4 style="margin: 0; font-size: 16px">Date: ${new Date().toLocaleDateString()}</h4>
          </div>

          <!-- Items Received Table -->
          <h2>Items Received:</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr>
                <th style="border: 1px solid #000; padding: 10px; text-align: left; background-color: #f2f2f2;">No.</th>
                <th style="border: 1px solid #000; padding: 10px; text-align: left; background-color: #f2f2f2;">Item</th>
                <th style="border: 1px solid #000; padding: 10px; text-align: left; background-color: #f2f2f2;">Quantity</th>
                <th style="border: 1px solid #000; padding: 10px; text-align: left; background-color: #f2f2f2;">Buyer</th>
                <th style="border: 1px solid #000; padding: 10px; text-align: left; background-color: #f2f2f2;">Date</th>
                <th style="border: 1px solid #000; padding: 10px; text-align: left; background-color: #f2f2f2;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${monthlyItems
                .map(
                  (item, index) => `
                    <tr>
                      <td style="border: 1px solid #000; padding: 10px;">${
                        index + 1
                      }</td>
                      <td style="border: 1px solid #000; padding: 10px;">${
                        item.item
                      }</td>
                      <td style="border: 1px solid #000; padding: 10px;">${
                        item.quantity
                      }</td>
                      <td style="border: 1px solid #000; padding: 10px;">${
                        item.buyer
                      }</td>
                      <td style="border: 1px solid #000; padding: 10px;">${
                        item.date
                      }</td>
                      <td style="border: 1px solid #000; padding: 10px;">Rs. ${
                        item.price
                      }</td>
                    </tr>`,
                )
                .join('')}
              <!-- Total Price Section -->
              <tr class="total-row">
                <td colspan="5" style="border: 1px solid #000; padding: 10px; text-align: right; font-weight: bold; background-color: #f9f9f9;">Total Items Price:</td>
                <td style="border: 1px solid #000; padding: 10px; font-weight: bold; background-color: #f9f9f9;">Rs. ${totalBill}</td>
              </tr>
              <tr class="total-row">
                <td colspan="5" style="border: 1px solid #000; padding: 10px; text-align: right; font-weight: bold; background-color: #f9f9f9;">Previous Bill:</td>
                <td style="border: 1px solid #000; padding: 10px; font-weight: bold; background-color: #f9f9f9;">Rs. ${previousBill}</td>
              </tr>
              <tr class="total-row">
                <td colspan="5" style="border: 1px solid #000; padding: 10px; text-align: right; font-weight: bold; background-color: #f9f9f9;">Current Bill:</td>
                <td style="border: 1px solid #000; padding: 10px; font-weight: bold; background-color: #f9f9f9;">Rs. ${currentBill}</td>
              </tr>
              <tr class="total-row">
                <td colspan="5" style="border: 1px solid #000; padding: 10px; text-align: right; font-weight: bold; background-color: #f9f9f9;">Overall Total:</td>
                <td style="border: 1px solid #000; padding: 10px; font-weight: bold; background-color: #f9f9f9;">Rs. ${overallTotal}</td>
              </tr>
            </tbody>
          </table>

          <!-- Footer Section -->
          <div style="text-align: right; font-size: 16px; margin-top: 20px">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </body>`;

    const options = {
      html,
      fileName: 'MonthlyReport',
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF file path:', file.filePath);
      return file.filePath;
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  const handleDownload = async () => {
    const filePath = await generatePDF();
    if (filePath) {
      console.log('PDF successfully generated at:', filePath);
    }
  };

  const handleShare = async () => {
    const filePath = await generatePDF();
    if (filePath) {
      const shareOptions = {
        title: 'Share PDF',
        url: `file://${filePath}`,
        type: 'application/pdf',
        message: 'Here is your Monthly Report',
      };
      await Share.open(shareOptions);
    }
  };

  const renderItem = ({item, index}) => {
    if (item.isSummary) {
      return (
        <View style={styles.summary}>
          <SummaryRow
            label="Total Items Price:"
            value={`Rs. ${item.totalBill}`}
          />
          <SummaryRow
            label="Previous Bill:"
            value={`Rs. ${item.previousBill}`}
          />
          <SummaryRow label="Current Bill:" value={`Rs. ${item.currentBill}`} />
          <SummaryRow
            label="Overall Total:"
            value={`Rs. ${item.overallTotal}`}
          />
        </View>
      );
    }

    return (
      <View style={styles.itemRow}>
        <Text style={styles.itemValue}>{index + 1}</Text>
        <Text style={styles.itemValue}>{item.item}</Text>
        <Text style={styles.itemValue}>{item.quantity}</Text>
        <Text style={styles.itemValue}>{item.buyer}</Text>
        <Text style={styles.itemValue}>{item.date}</Text>
        <Text style={styles.itemValue}>{`Rs. ${item.price}`}</Text>
      </View>
    );
  };

  const SummaryRow = ({label, value}) => (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Monthly Report</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.itemsHeaderText}>Monthly Items Received:</Text>

        <View style={styles.itemsHeaderContainer}>
          {['No.', 'Item', 'Quantity', 'Buyer', 'Date', 'Price'].map(header => (
            <Text key={header} style={styles.itemsHeader}>
              {header}
            </Text>
          ))}
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.isSummary ? 'summary' : index.toString()
          }
          style={styles.itemsList}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Download Report"
            onPress={handleDownload}
            color={COLORS.primary}
          />
          <Button
            title="Share Report"
            onPress={handleShare}
            color={COLORS.dark}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  header: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  summary: {
    backgroundColor: '#f7f8fa',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#495057',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  itemsHeaderText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 12,
  },
  itemsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    marginBottom: 16,
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    width: '16%',
    textAlign: 'center',
  },
  itemsList: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    width: '16%',
    color: '#495057',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
});

export default MonthlyReport;
