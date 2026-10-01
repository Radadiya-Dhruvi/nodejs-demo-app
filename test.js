console.log('Automated test running...');
if (1 + 1 === 2) {
  console.log('Test Passed!');
  process.exit(0);
} else {
  console.log('Test Failed!');
  process.exit(1);
}