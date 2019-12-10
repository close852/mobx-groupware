package com.cjhm;

import java.lang.management.ManagementFactory;

import com.sun.management.OperatingSystemMXBean;

public class ResourceAPI {

	private static OperatingSystemMXBean osbean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();

	public static void main(String[] args) {
		System.out.println("OS Name: " + osbean.getName());
		System.out.println("OS Arch: " + osbean.getArch());

		System.out.println(getTotalRam());
		System.out.println(getFreeRam());
		System.out.println(getUsageRam());
		System.out.println(getSystemCpu());
	}

	// private static String toMB(long size) {
	// return (int) (size / (1024 * 1024)) + "(MB)";
	// }

	public static double getTotalRam() {
		return osbean.getTotalPhysicalMemorySize();
	}

	public static double getFreeRam() {
		return osbean.getFreePhysicalMemorySize();
	}

	public static double getUsageRam() {
		return 1 - osbean.getFreePhysicalMemorySize() * 1.0 / osbean.getTotalPhysicalMemorySize();
	}

	public static double getSystemCpu() {
		return osbean.getSystemCpuLoad();
	}
}
