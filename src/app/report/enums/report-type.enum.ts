export enum ReportType {
  // Door won't lock
  DWL = 1,

  // Door won't Open
  DWO,

  // Mailbox display is broken
  MBDB,

  // Main display is broken
  MDB,

  // No incoming signal receive
  NSR,

  // Barcode reader broken
  BRB,

  // No connection
  OC,

  // Other problem
  OP,

  // Technician
  TEC,
}
