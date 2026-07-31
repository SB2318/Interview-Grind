**LeetCode 1235 - Maximum Profit in Job Scheduling** is one of the most important **DP + Binary Search** problems.

The pattern is:

> **Take / Not Take + Binary Search**

---

# Problem

You are given three arrays:

```text
startTime[]
endTime[]
profit[]
```

Each job is

```text
(start, end, profit)
```

You can perform multiple jobs **as long as they don't overlap**.

Need to maximize total profit.

Example:

```text
Start : 1 2 3 3
End   : 3 4 5 6
Profit:50 10 40 70
```

Jobs:

```text
(1,3,50)
(2,4,10)
(3,5,40)
(3,6,70)
```

Maximum profit =

```text
(1,3,50)
+
(3,6,70)

=120
```

Notice:

Job ending at **3** and another starting at **3** are allowed.

---

# Step 1 : Sort Jobs

Create a Job class.

```java
class Job{
    int start;
    int end;
    int profit;

    Job(int s,int e,int p){
        start=s;
        end=e;
        profit=p;
    }
}
```

Store all jobs.

Sort according to **start time**.

```
Index

0
1
2
3
```

```
(start,end,profit)
```

---

# Step 2 : DP State

Suppose we're at index `i`.

Question:

> What is the maximum profit we can earn starting from job `i`?

State:

```text
dp[i]
```

---

# Step 3 : Choices

At every job, only two options exist.

## Skip

Ignore current job.

```
i

↓

Next Job
```

Profit

```text
solve(i+1)
```

---

## Take

Take current job.

Profit becomes

```text
current profit
+
next compatible job
```

Question:

How do we find the next compatible job?

---

# Step 4 : Binary Search

Current job

```
Start = 2
End   = 5
```

Need first job whose

```text
start >= 5
```

Because overlapping isn't allowed.

Since jobs are sorted by start time,

Binary Search can find it.

Example

```
Start Times

1
2
4
6
8
```

Current end = 5

Binary Search gives

```
6
```

That becomes our next state.

---

# Step 5 : Recurrence

Suppose

```
Current Job

profit = 40

Next compatible index = j
```

Take

```text
40 + solve(j)
```

Not Take

```text
solve(i+1)
```

Answer

```text
max(
take,
notTake
)
```

---

# Recursion

```java
solve(i){

    if(i==n)
        return 0;

    notTake = solve(i+1);

    next = binarySearch();

    take = jobs[i].profit + solve(next);

    return max(take,notTake);
}
```

---

# Why Binary Search?

Suppose

```
Jobs

Index

0
1
2
3
4
```

```
Start

1
3
5
8
10
```

Current job ends at

```
6
```

Need the first job starting at

```
>=6
```

Binary Search immediately gives

```
Index 3
```

instead of scanning all remaining jobs.

---

# Complexity

Sorting

```
O(n log n)
```

Every state

```
Binary Search
```

```
O(log n)
```

States

```
n
```

Overall

```
O(n log n)
```

Space

```
O(n)
```

---

## Pattern to Remember

Whenever you see:

* Intervals or jobs
* "Choose or skip"
* Need the **next non-overlapping interval**
* Intervals can be sorted

think:

> **Sort + DP + Binary Search**

This exact pattern also appears in problems like **Weighted Interval Scheduling**, **Maximum Earnings From Taxi**, and several interval DP problems.


```
class Solution {
    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        int n = startTime.length;
        Job[] jobs = new Job[n];
        int[] dp = new int[n];
        Arrays.fill(dp, -1);

        for(int i=0; i<n; i++){
            jobs[i] = new Job(startTime[i], endTime[i], profit[i]);
        }

        Arrays.sort(jobs, (a, b)-> Integer.compare(a.start, b.start));

        return solve(0, jobs, dp);
    }

    private int solve(int ind, Job[] jobs, int[] dp){

        if(ind >= jobs.length){
           return 0;
        }
        if(dp[ind] != -1){
            return dp[ind];
        }
        int skip = solve(ind+1, jobs, dp);
        int take = Integer.MIN_VALUE;
        int next = lowerBound(jobs, jobs[ind].end);
        
        if(next >= 0 || next < jobs.length){
           take = jobs[ind].profit + solve(next, jobs, dp);
        }
        return dp[ind] = Math.max(take, skip);
    }

    private int lowerBound(Job[] jobs, int target){
        int low =0, high = jobs.length-1;

        while(low <= high){

            int mid = low + (high-low)/2;

            if(jobs[mid].start >= target){
                high = mid-1;
            }else{
                low = mid+1;
            }
        }

        return low;
    }

    class Job {
        int start, end, profit;

        public Job(int start, int end, int profit){
            this.start = start;
            this.end = end;
            this.profit = profit;
        }
    }
}

```
