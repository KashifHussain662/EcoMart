import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {COLORS} from '../../theme'; // Ensure this path is correct
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const MonthlyReport = ({route}) => {
  const {monthlyItems, previousBill, currentBill} = route.params;

  const totalBill = monthlyItems.reduce((sum, item) => sum + item.price, 0);
  const overallTotal = previousBill + currentBill + totalBill;

  const data = [
    ...monthlyItems,
    {isSummary: true, totalBill, previousBill, currentBill, overallTotal},
  ];

  const generatePDF = async () => {
    const html = `
      <h1>Monthly Report</h1>
      <h2>Items Received:</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <th style="border:1px solid #000;">Item</th>
          <th style="border:1px solid #000;">Quantity</th>
          <th style="border:1px solid #000;">Buyer</th>
          <th style="border:1px solid #000;">Date</th>
          <th style="border:1px solid #000;">Price</th>
        </tr>
        ${monthlyItems
          .map(
            item => `
            <tr>
              <td style="border:1px solid #000;">${item.item}</td>
              <td style="border:1px solid #000;">${item.quantity}</td>
              <td style="border:1px solid #000;">${item.buyer}</td>
              <td style="border:1px solid #000;">${item.date}</td>
              <td style="border:1px solid #000;">Rs. ${item.price}</td>
            </tr>
          `,
          )
          .join('')}
        <tr>
          <td colspan="4" style="border:1px solid #000; text-align:right;">Total Items Price:</td>
          <td style="border:1px solid #000;">Rs. ${totalBill}</td>
        </tr>
        <tr>
          <td colspan="4" style="border:1px solid #000; text-align:right;">Previous Bill:</td>
          <td style="border:1px solid #000;">Rs. ${previousBill}</td>
        </tr>
        <tr>
          <td colspan="4" style="border:1px solid #000; text-align:right;">Current Bill:</td>
          <td style="border:1px solid #000;">Rs. ${currentBill}</td>
        </tr>
        <tr>
          <td colspan="4" style="border:1px solid #000; text-align:right;">Overall Total:</td>
          <td style="border:1px solid #000;">Rs. ${overallTotal}</td>
        </tr>
      </table>
    `;

    const options = {
      html,
      fileName: 'MonthlyReport',
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF file path:', file.filePath);

      // Share the PDF file
      const shareOptions = {
        title: 'Share PDF',
        url: `file://${file.filePath}`,
        type: 'application/pdf',
        message: 'Here is your Monthly Report',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      // Handle error, maybe show a message to the user
    }
  };

  // Render individual items
  const renderItem = ({item}) => {
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
        <Text style={styles.itemValue}>{item.item}</Text>
        <Text style={styles.itemValue}>{item.quantity}</Text>
        <Text style={styles.itemValue}>{item.buyer}</Text>
        <Text style={styles.itemValue}>{item.date}</Text>
        <Text style={styles.itemValue}>{`Rs. ${item.price}`}</Text>
      </View>
    );
  };

  // Summary Row Component
  const SummaryRow = ({label, value}) => (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Monthly Report</Text>
      </View>

      <Text style={styles.itemsHeaderText}>Monthly Items Received:</Text>

      <View style={styles.itemsHeaderContainer}>
        {['Item', 'Quantity', 'Buyer', 'Date', 'Price'].map(header => (
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

      <Button title="Download and Share Report" onPress={generatePDF} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  summary: {
    borderRadius: 8,
    padding: 20,
    backgroundColor: '#f1f3f5',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#343a40',
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
    marginBottom: 10,
  },
  itemsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    marginBottom: 10,
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    width: '20%',
    textAlign: 'center',
  },
  itemsList: {
    marginBottom: 0,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    width: '20%',
    color: '#495057',
    textAlign: 'center',
  },
});

export default MonthlyReport;
